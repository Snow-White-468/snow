"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const hearts = [
  { id: 1, left: "5%", duration: 8, delay: 0, size: 18 },
  { id: 2, left: "15%", duration: 10, delay: 1, size: 24 },
  { id: 3, left: "25%", duration: 9, delay: 2, size: 20 },
  { id: 4, left: "35%", duration: 11, delay: 0.5, size: 16 },
  { id: 5, left: "45%", duration: 8, delay: 3, size: 22 },
  { id: 6, left: "55%", duration: 10, delay: 2.5, size: 18 },
  { id: 7, left: "65%", duration: 9, delay: 1.5, size: 26 },
  { id: 8, left: "75%", duration: 11, delay: 0, size: 20 },
  { id: 9, left: "85%", duration: 8, delay: 2, size: 24 },
  { id: 10, left: "95%", duration: 10, delay: 1, size: 18 },
];

export default function FloatingHearts() {
  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{ left: heart.left }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: -900, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            size={heart.size}
            className="fill-pink-500 text-pink-500"
          />
        </motion.div>
      ))}
    </>
  );
}