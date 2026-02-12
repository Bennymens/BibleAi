import { motion } from "framer-motion";

const VersePage = ({ scripture, onBack, translation, onTranslationChange }) => {
  if (!scripture) return null;

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        <h1 className="text-3xl font-bold mb-4">
          {scripture.book} {scripture.chapter}:{scripture.verse}
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {scripture.text}
        </p>
        <div className="mb-8">
          <select
            value={translation}
            onChange={(e) => onTranslationChange(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="KJV">KJV</option>
            <option value="NIV">NIV</option>
            <option value="ESV">ESV</option>
          </select>
        </div>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default VersePage;
