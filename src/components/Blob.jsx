// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Blob = ({ volume }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(1 + volume * 0.5); // scale up to 1.5
  }, [volume]);

  return (
    <motion.div
      className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-70"
      animate={{
        scale,
        borderRadius: ["50%", "60%", "50%"], // morphing
      }}
      transition={{
        scale: { duration: 0.1 },
        borderRadius: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{
        filter: `blur(${volume * 10}px)`, // glow
      }}
    />
  );
};

export default Blob;
