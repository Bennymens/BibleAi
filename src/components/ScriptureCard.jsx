// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ScriptureCard = ({ scripture, onClose }) => {
  if (!scripture) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-lg rounded-t-lg"
    >
      <h2 className="text-xl font-bold">
        {scripture.book} {scripture.chapter}:{scripture.verse}
      </h2>
      <p className="text-gray-700 mt-2">{scripture.text}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Close
      </button>
    </motion.div>
  );
};

export default ScriptureCard;
