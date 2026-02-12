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

      <div className="relative z-10 text-center flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 max-w-4xl">
        {/* Listening indicator */}
        <div className="mb-6 sm:mb-8">
          <div className="relative">
            {/* Pulsing circle */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-purple-500 opacity-20 animate-ping absolute"></div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-purple-600 flex items-center justify-center relative">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-white"
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
          {isListening ? "Listening..." : "Stopped"}
        </h1>

        <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
          Speak a Bible verse reference (e.g., "John 3:16")
        </p>

        {/* Volume indicator */}
        <div className="w-full max-w-sm sm:max-w-md mb-6 sm:mb-8">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
              style={{ width: `${volume * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Transcript display */}
        <div className="min-h-[80px] sm:min-h-[120px] w-full mb-6 sm:mb-8">
          {(transcript || interimTranscript) && (
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
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
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 w-full">
            <p className="text-sm sm:text-base text-red-300 break-words">
              {error}
            </p>
          </div>
        )}

        {/* Stop button */}
        <div className="touch-target">
          <BubbleButton onClick={handleStop} label="Stop Listening" />
        </div>

        {/* Help text */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500 px-4">
            Try: "John 3:16", "Psalm 23:1", "Genesis 1:1", "Philippians 4:13"
          </p>
        </div>
      </div>
    </div>
  );
}

export default ListeningPage;
