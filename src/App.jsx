import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import VersePage from "./components/VersePage";
import ListeningPage from "./components/ListeningPage";
import DarkVeil from "./components/DarkVeil";
import BubbleButton from "./components/BubbleButton";
import { startListening, stopListening } from "./utils/speechRecognition";
import { startVolumeDetection, stopVolumeDetection } from "./utils/audioVolume";
import { parseScripture } from "./utils/parseScripture";
import bibleDB from "../api/bibleDB.json";

// ─── Error Boundary ───────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Sync local DB lookup (instant — no async) ────────────────────────────────
function lookupVerse(book, chapter, verse) {
  const ch = parseInt(chapter);
  const vs = parseInt(verse);
  const variants = [book];
  if (book === "Psalms") variants.push("Psalm");
  if (book === "Psalm") variants.push("Psalms");

  for (const bk of variants) {
    const target = `${bk} ${ch}:${vs}`.toLowerCase();
    const entry = bibleDB.find(
      (v) => v.reference.toLowerCase().trim() === target
    );
    if (entry) return entry;
  }
  return null;
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden safe-area">
      <div className="absolute inset-0 w-full h-full">
        <DarkVeil
          hueShift={0} noiseIntensity={0} scanlineIntensity={0}
          speed={0.5} scanlineFrequency={0} warpAmount={0}
        />
      </div>
      <div className="relative z-10 text-center flex flex-col items-center justify-center px-4 sm:px-6">
        {!(window.SpeechRecognition || window.webkitSpeechRecognition) && (
          <p className="mt-4 text-sm sm:text-base text-red-400 mb-4 px-4">
            Speech recognition is not supported in this browser. Please use
            Chrome, Edge, or Safari.
          </p>
        )}
        <div className="touch-target">
          <BubbleButton
            onClick={() => navigate("/listening")}
            label="Start Listening"
          />
        </div>
        <p className="mt-6 text-sm sm:text-base text-gray-400 mb-4 px-4">
          Click the button to start voice recognition
        </p>
      </div>
    </div>
  );
}

// ─── App Content (all state lives here) ──────────────────────────────────────
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [scripture, setScripture] = useState(null);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Stable refs — avoids re-creating callbacks on every render
  const lastFetchedRef = useRef(null);
  const navigateRef = useRef(navigate);
  const locationRef = useRef(location);
  const isListeningRef = useRef(false); // tracks the "should be listening" intent

  useEffect(() => { navigateRef.current = navigate; }, [navigate]);
  useEffect(() => { locationRef.current = location; }, [location]);

  // ── Scripture display: synchronous local hit, instant navigate ────────────
  // Wrapped in ref so the callback passed to startListening never changes
  const displayScriptureRef = useRef(null);
  displayScriptureRef.current = (parsed) => {
    // Try local DB first — synchronous, zero delay
    const entry = lookupVerse(parsed.book, parsed.chapter, parsed.verse);
    if (entry) {
      const parts = entry.reference.split(" ");
      const [ch, vs] = parts[parts.length - 1].split(":");
      setScripture({
        book: parts.slice(0, parts.length - 1).join(" "),
        chapter: ch,
        verse: vs,
        text: entry.text,
        translation: "KJV",
      });
      setError("");
      // Navigate immediately — no useEffect wait, no extra render cycle
      if (locationRef.current.pathname !== "/verse") {
        navigateRef.current("/verse");
      }
      return true;
    }

    // Network fallback (verses not in local DB)
    const ref = encodeURIComponent(`${parsed.book} ${parsed.chapter}:${parsed.verse}`);
    fetch(`/api/verse?reference=${ref}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const parts = data.reference.split(" ");
        const [ch, vs] = parts[parts.length - 1].split(":");
        setScripture({
          book: parts.slice(0, parts.length - 1).join(" "),
          chapter: ch,
          verse: vs,
          text: data.text,
          translation: "KJV",
        });
        setError("");
        if (locationRef.current.pathname !== "/verse") {
          navigateRef.current("/verse");
        }
      })
      .catch(() => {
        setError(
          `Not in library: ${parsed.book} ${parsed.chapter}:${parsed.verse}`
        );
        setTimeout(() => setError(""), 4000);
      });

    return false;
  };

  // ── Stable speech callback — never changes identity ───────────────────────
  const speechCallback = useCallback((finalText, interimText) => {
    if (finalText) {
      setTranscript(finalText);
      setInterimTranscript("");
      const parsed = parseScripture(finalText);
      if (parsed && parsed.reference !== lastFetchedRef.current) {
        lastFetchedRef.current = parsed.reference;
        displayScriptureRef.current(parsed);
      }
    } else if (interimText) {
      setInterimTranscript(interimText);
      // Fire immediately on interim for speed
      const parsed = parseScripture(interimText);
      if (parsed && parsed.reference !== lastFetchedRef.current) {
        lastFetchedRef.current = parsed.reference;
        displayScriptureRef.current(parsed);
      }
    }
  }, []); // ← empty deps: function identity never changes

  // ── Start/stop listening — only triggered by isListening flag ─────────────
  useEffect(() => {
    if (isListening) {
      isListeningRef.current = true;
      startListening(speechCallback);
      startVolumeDetection(setVolume);
    } else {
      isListeningRef.current = false;
      stopListening();
      stopVolumeDetection();
    }
    // No cleanup here — we intentionally keep the mic alive across route changes
    // Cleanup only happens when isListening goes false (handled above)
  }, [isListening, speechCallback]);

  // ── Reset lastFetchedRef when coming back to /listening ──────────────────
  const handleEnterListening = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setScripture(null);
    setError("");
    lastFetchedRef.current = null;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/listening"
        element={
          <ListeningPage
            transcript={transcript}
            interimTranscript={interimTranscript}
            isListening={isListening}
            setIsListening={setIsListening}
            error={error}
            volume={volume}
            onEnter={handleEnterListening}
          />
        }
      />

      <Route
        path="/verse"
        element={
          <VersePage
            scripture={scripture}
            isListening={isListening}
            interimTranscript={interimTranscript}
            onBack={() => {
              // Go back to listening — mic stays ON
              setTranscript("");
              setInterimTranscript("");
              setScripture(null);
              setError("");
              lastFetchedRef.current = null;
              navigate("/listening");
            }}
            onStop={() => {
              // Explicit stop — mic OFF, go home
              setIsListening(false);
              setScripture(null);
              navigate("/");
            }}
          />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
