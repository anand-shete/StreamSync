import React from "react";
import { motion } from "motion/react";

const LiveRing = () => {
  return (
    <div className="flex flex-row space-x-4">
      <motion.div
        className="h-5 w-5 rounded-full bg-red-600"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p>Live</p>
    </div>
  );
};

export default LiveRing;
