"use client";

import { motion } from "framer-motion";

export default function TwinkleSparkle({
  className = "",
}: {
  className?: string;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`inline-flex select-none text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.75)] ${className}`}
      initial={{ opacity: 0.6, scale: 0.92 }}
      animate={{
        opacity: [0.55, 1, 0.55],
        scale: [0.92, 1.18, 0.92],
        y: [0, -1.5, 0],
      }}
      transition={{
        duration: 1.35,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-full w-full"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 1.6l1.9 6.5 6.5 1.9-6.5 1.9-1.9 6.5-1.9-6.5-6.5-1.9 6.5-1.9L12 1.6z" />
        <path
          d="M18.6 14.8l1 3.1 3.1 1-3.1 1-1 3.1-1-3.1-3.1-1 3.1-1 1-3.1z"
          opacity="0.9"
        />
      </svg>
    </motion.span>
  );
}
