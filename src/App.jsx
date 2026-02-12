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
import DarkVeil from "./components/DarkVeil";
import BubbleButton from "./components/BubbleButton";
import { startListening, stopListening } from "./utils/speechRecognition";
import { startVolumeDetection, stopVolumeDetection } from "./utils/audioVolume";
import { parseScripture } from "./utils/parseScripture";

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
        <div className="min-h-screen bg-black flex items-center justify-center">
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

  useEffect(() => {
    if (scripture) {
      navigate("/verse");
    }
  }, [scripture, navigate]);

  const handleTranslationChange = (newTrans) => {
    setTranslation(newTrans);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
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
      <div className="relative z-10 text-center flex flex-col items-center justify-center">
        {!isListening &&
          !(window.SpeechRecognition || window.webkitSpeechRecognition) && (
            <p className="mt-4 text-base text-red-400 mb-4">
              Speech recognition is not supported in this browser. Please use
              Chrome, Edge, or Safari.
            </p>
          )}

        <BubbleButton
          onClick={() => {
            if (isListening) {
              setTranscript("");
              setInterimTranscript("");
            }
            setIsListening(!isListening);
          }}
          label={isListening ? "Stop Listening" : "Start Listening"}
        />

        <p className="mt-6 text-base text-gray-400 mb-4 min-h-[60px] flex items-center justify-center">
          {transcript || interimTranscript ? (
            <>
              {transcript || interimTranscript}
              {!transcript && interimTranscript && (
                <span className="opacity-50 ml-2">(listening...)</span>
              )}
            </>
          ) : null}
        </p>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}

function AppContent() {
  const [transcript, setTranscript] = useState("");
  const [scripture, setScripture] = useState(null);
  const [translation, setTranslation] = useState("KJV");
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");

  const fetchScripture = async (book, chapter, verse, trans) => {
    // Mock response for testing
    const mockData = {
      book,
      chapter: parseInt(chapter),
      verse: parseInt(verse),
      translation: trans,
      text: `This is a mock scripture for ${book} ${chapter}:${verse} in ${trans}. Replace with real Bible text when backend is ready.`,
    };
    setScripture(mockData);
    setError("");
  };

  useEffect(() => {
    if (isListening) {
      startListening((finalText, interimText) => {
        if (finalText) {
          setTranscript(finalText);
          setInterimTranscript("");
          const parsed = parseScripture(finalText);
          if (parsed) {
            fetchScripture(
              parsed.book,
              parsed.chapter,
              parsed.verse,
              translation,
            );
          }
        }
        setInterimTranscript(interimText);
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
        path="/verse"
        element={
          <VersePage
            scripture={scripture}
            onBack={() => {
              setScripture(null);
              setTranscript("");
              setInterimTranscript("");
            }}
            translation={translation}
            onTranslationChange={handleTranslationChange}
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
