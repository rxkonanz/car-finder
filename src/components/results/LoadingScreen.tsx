"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Analyzing your lifestyle...",
  "Matching with 200+ models...",
  "Checking safety ratings...",
  "Calculating value scores...",
  "Personalizing your recommendations...",
];

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4">
      {/* Animated logo/icon */}
      <div className="relative mb-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-indigo-500/30"
            style={{
              width: 80 + i * 40,
              height: 80 + i * 40,
              top: -(i * 20),
              left: -(i * 20),
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
        <div className="w-20 h-20 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full border-2 border-transparent border-t-indigo-400 border-r-indigo-400"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-zinc-100 mb-3">Finding your perfect match</h2>

      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="text-zinc-400 text-base text-center min-h-[1.5rem]"
        >
          {MESSAGES[messageIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {MESSAGES.map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            animate={{
              backgroundColor: i === messageIndex ? "#6366f1" : "#3f3f46",
              scale: i === messageIndex ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
