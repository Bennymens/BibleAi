import { motion } from "framer-motion";

const VersePage = ({ scripture, onBack, translation, onTranslationChange }) => {
  if (!scripture) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden safe-area flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full text-center px-4 py-6 sm:px-6 sm:py-8"
        >
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-semibold italic text-gray-100 mb-4 sm:mb-6 leading-relaxed">
            “{scripture.text}”
          </blockquote>
          <div className="mb-6 sm:mb-8">
            <span className="block text-lg sm:text-xl md:text-2xl font-bold text-blue-400 tracking-wide mb-2">
              {scripture.book} {scripture.chapter}:{scripture.verse}
            </span>
          </div>
          <button
            onClick={() => onBack("/")}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 active:bg-blue-700 touch-target text-base sm:text-lg transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default VersePage;
