import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DarkVeil from "./DarkVeil";
import BubbleButton from "./BubbleButton";

function ListeningPage({
  transcript,
  interimTranscript,
  isListening,
  setIsListening,
  error,
  volume,
}) {
  const navigate = useNavigate();

  // Automatically start listening when the page loads
  useEffect(() => {
    setIsListening(true);

    // Cleanup: stop listening when leaving the page
    return () => {
      setIsListening(false);
    };
  }, [setIsListening]);

  const handleStop = () => {
    setIsListening(false);
    navigate("/");
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden safe-area">
      <div className="absolute inset-0 w-full h-full">
        <DarkVeil
          hueShift={volume * 120}
          noiseIntensity={0.1}
          scanlineIntensity={0.05}
          speed={0.5 + volume}
          scanlineFrequency={10}
          warpAmount={volume * 0.3}
        />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 max-w-4xl gap-2">
        {/* Listening indicator */}
        <div>
          <div className="relative">
            {/* Pulsing circle */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-purple-500 opacity-20 animate-ping absolute"></div>
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-purple-600 flex items-center justify-center relative">
              <svg
                className="w-16 h-16 sm:w-18 sm:h-18 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Status text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          {isListening ? "Listening..." : "Stopped"}
        </h1>

        <p className="text-base sm:text-lg text-gray-400">
          Speak a Bible verse reference (e.g., "John 3:16")
        </p>

        {/* Volume indicator */}
        <div className="w-full max-w-md sm:max-w-lg">
          <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
              style={{ width: `${volume * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Transcript display */}
        <div className="min-h-[70px] sm:min-h-[90px] w-full">
          {(transcript || interimTranscript) && (
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 sm:p-5">
              <p className="text-lg sm:text-xl md:text-2xl text-white break-words">
                {transcript || (
                  <span className="text-gray-400 italic">
                    {interimTranscript}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Error display */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 sm:p-4 w-full">
            <p className="text-sm sm:text-base text-red-300 break-words">
              {error}
            </p>
          </div>
        )}

        {/* Stop button */}
        <div className="touch-target mt-2">
          <BubbleButton onClick={handleStop} label="Stop Listening" />
        </div>

        {/* Help text */}
        <div className="text-center mt-2">
          <p className="text-xs sm:text-sm text-gray-500 px-4">
            Try: "John 3:16", "Psalm 23:1", "Genesis 1:1", "Philippians 4:13"
          </p>
        </div>
      </div>
    </div>
  );
}

export default ListeningPage;
