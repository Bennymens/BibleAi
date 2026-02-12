import { motion } from "framer-motion";

const VersePage = ({ scripture, onBack, translation, onTranslationChange }) => {
  if (!scripture) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-auto safe-area">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center my-auto"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-2">
          {scripture.book} {scripture.chapter}:{scripture.verse}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed px-2">
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
  );
};

export default VersePage;
