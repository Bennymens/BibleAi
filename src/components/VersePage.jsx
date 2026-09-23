import { motion, AnimatePresence } from "framer-motion";

const VersePage = ({ scripture, isListening, interimTranscript, onBack, onStop }) => {
  if (!scripture) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden safe-area flex flex-col items-center justify-center">

        <AnimatePresence mode="wait">
          <motion.div
            key={`${scripture.book}-${scripture.chapter}-${scripture.verse}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-2xl w-full text-center px-4 py-6 sm:px-6 sm:py-8"
          >
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-semibold italic text-gray-100 mb-4 sm:mb-6 leading-relaxed">
              "{scripture.text}"
            </blockquote>

            <div className="mb-6 sm:mb-8">
              <span className="block text-lg sm:text-xl md:text-2xl font-bold text-blue-400 tracking-wide mb-2">
                {scripture.book} {scripture.chapter}:{scripture.verse}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onBack}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 active:bg-purple-800 touch-target text-base sm:text-lg transition-colors"
              >
                Listen Again
              </button>
              <button
                onClick={onStop}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 active:bg-gray-500 touch-target text-base sm:text-lg transition-colors"
              >
                Stop
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Listening-in-background indicator */}
        {isListening && (
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 px-4">
            {/* Live interim transcript while on verse page */}
            {interimTranscript && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-4 py-2 max-w-sm"
              >
                <p className="text-amber-300 italic text-sm text-center">
                  {interimTranscript}
                </p>
              </motion.div>
            )}

            {/* Mic pill */}
            <div className="flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
              </span>
              <span className="text-xs text-gray-300 font-medium tracking-wide">
                Listening for next verse…
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersePage;
