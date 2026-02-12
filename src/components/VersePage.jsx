import { motion } from "framer-motion";

const VersePage = ({ scripture, onBack, translation, onTranslationChange }) => {
  if (!scripture) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-white overflow-hidden">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden safe-area flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full text-center px-4 py-6 sm:px-6 sm:py-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            {scripture.book} {scripture.chapter}:{scripture.verse}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
            {scripture.text}
          </p>
          <div className="mb-6 sm:mb-8">
            <select
              value={translation}
              onChange={(e) => onTranslationChange(e.target.value)}
              className="px-4 py-3 sm:py-2 border rounded text-base sm:text-sm touch-target min-w-[120px]"
            >
              <option value="KJV">KJV</option>
              <option value="NIV">NIV</option>
              <option value="ESV">ESV</option>
            </select>
          </div>
          <button
            onClick={onBack}
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
