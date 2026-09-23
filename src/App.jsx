import { useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import TranslationSelector from "./components/TranslationSelector";
import VersePage from "./components/VersePage";
import ListeningPage from "./components/ListeningPage";
import DarkVeil from "./components/DarkVeil";
import BubbleButton from "./components/BubbleButton";
import { startListening, stopListening } from "./utils/speechRecognition";
import { startVolumeDetection, stopVolumeDetection } from "./utils/audioVolume";
import { parseScripture } from "./utils/parseScripture";
import bibleDB from "../api/bibleDB.json";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-lg mb-4">
              The app encountered an error. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600"
            >
              Refresh Page
            </button>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer">Error Details</summary>
              <pre className="mt-2 text-sm bg-black bg-opacity-50 p-4 rounded overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function HomePage({
  transcript,
  interimTranscript,
  isListening,
  setIsListening,
  translation,
  setTranslation,
  error,
  scripture,
  setScripture,
  setTranscript,
  setInterimTranscript,
}) {
  const navigate = useNavigate();

  const handleTranslationChange = (newTrans) => {
    setTranslation(newTrans);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden safe-area">
      <div className="absolute inset-0 w-full h-full">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      <div className="relative z-10 text-center flex flex-col items-center justify-center px-4 sm:px-6">
        {!isListening &&
          !(window.SpeechRecognition || window.webkitSpeechRecognition) && (
            <p className="mt-4 text-sm sm:text-base text-red-400 mb-4 px-4">
              Speech recognition is not supported in this browser. Please use
              Chrome, Edge, or Safari.
            </p>
          )}

        <div className="touch-target">
          <BubbleButton
            onClick={() => {
              navigate("/listening");
            }}
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

function AppContent() {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState("");
  const [scripture, setScripture] = useState(null);
  const [translation, setTranslation] = useState("KJV");
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");

  const fetchScripture = async (book, chapter, verse, trans) => {
    // Normalize book name variants (e.g. "Psalms" → try both)
    const bookVariants = [book];
    if (book === "Psalms") bookVariants.push("Psalm");
    if (book === "Psalm") bookVariants.push("Psalms");

    // 1. Try local bibleDB first (instant, no network needed)
    const chNum = parseInt(chapter);
    const vNum = parseInt(verse);
    let localEntry = null;
    for (const bk of bookVariants) {
      const refExact = `${bk} ${chNum}:${vNum}`;
      localEntry = bibleDB.find(
        (v) => v.reference.toLowerCase().trim() === refExact.toLowerCase().trim()
      );
      if (localEntry) break;
    }

    if (localEntry) {
      const parts = localEntry.reference.split(" ");
      const chapterVersePart = parts[parts.length - 1];
      const [ch, vs] = chapterVersePart.split(":");
      setScripture({
        book: parts.slice(0, parts.length - 1).join(" "),
        chapter: ch,
        verse: vs,
        text: localEntry.text,
        translation: trans,
      });
      setError("");
      return;
    }

    // 2. Fall back to network API (for Vercel / production)
    try {
      const ref = encodeURIComponent(`${book} ${chapter}:${verse}`);
      const response = await fetch(`/api/verse?reference=${ref}`);
      if (!response.ok) throw new Error("Not found");
      const data = await response.json();
      const refParts = data.reference.split(" ");
      const cvPart = refParts[refParts.length - 1];
      const [ch, vs] = cvPart.split(":");
      setScripture({
        book: refParts.slice(0, refParts.length - 1).join(" "),
        chapter: ch,
        verse: vs,
        text: data.text,
        translation: trans,
      });
      setError("");
    } catch (e) {
      setError(
        `Scripture not found: ${book} ${chapter}:${verse}. Try John 3:16, Psalm 23:1, or Genesis 1:1`,
      );
      setTimeout(() => setError(""), 5000);
    }
  };
  // Navigate to verse page when scripture is detected
  useEffect(() => {
    if (scripture) {
      navigate("/verse");
    }
  }, [scripture, navigate]);
  useEffect(() => {
    if (isListening) {
      // Track last fetched reference to avoid duplicate API calls
      let lastFetchedRef = null;

      startListening((finalText, interimText) => {
        if (finalText) {
          setTranscript(finalText);
          setInterimTranscript("");
          const parsed = parseScripture(finalText);
          if (parsed) {
            // Only fetch if not already fetched for this reference (e.g. interim already triggered it)
            if (parsed.reference !== lastFetchedRef) {
              lastFetchedRef = parsed.reference;
              fetchScripture(parsed.book, parsed.chapter, parsed.verse, translation);
            }
          }
        } else if (interimText) {
          setInterimTranscript(interimText);
          const parsed = parseScripture(interimText);
          if (parsed && parsed.reference !== lastFetchedRef) {
            lastFetchedRef = parsed.reference;
            fetchScripture(parsed.book, parsed.chapter, parsed.verse, translation);
          }
        }
      });
      startVolumeDetection(setVolume);
    } else {
      stopListening();
      stopVolumeDetection();
    }
    return () => {
      stopListening();
      stopVolumeDetection();
    };
  }, [isListening]);

  const handleTranslationChange = (newTrans) => {
    setTranslation(newTrans);
    if (scripture) {
      fetchScripture(
        scripture.book,
        scripture.chapter,
        scripture.verse,
        newTrans,
      );
    }
  };

  // Always clear scripture when entering /listening so new verses can be loaded
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            transcript={transcript}
            interimTranscript={interimTranscript}
            isListening={isListening}
            setIsListening={setIsListening}
            translation={translation}
            setTranslation={setTranslation}
            error={error}
            scripture={scripture}
            setScripture={setScripture}
            setTranscript={setTranscript}
            setInterimTranscript={setInterimTranscript}
          />
        }
      />
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
            onReset={() => {
              setTranscript("");
              setInterimTranscript("");
              setScripture(null);
              setError("");
            }}
          />
        }
      />
      <Route
        path="/verse"
        element={
          <VersePage
            scripture={scripture}
            onBack={() => {
              setScripture(null);
              setTranscript("");
              setInterimTranscript("");
              // Always return to listening page
              navigate("/listening");
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
