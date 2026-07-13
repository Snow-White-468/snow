"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Snowflake {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const generatedSnowflakes = Array.from({ length: 50 }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2, 
      duration: Math.random() * 6 + 6, 
      delay: Math.random() * 5, 
    }));
    
    requestAnimationFrame(() => {
      setSnowflakes(generatedSnowflakes);
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((snowflake, index) => (
        <motion.div
          key={snowflake.id}
          className="absolute -top-2.5 bg-white rounded-full opacity-70"
          style={{
            left: snowflake.left,
            width: snowflake.size,
            height: snowflake.size,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: ["0px", index % 2 === 0 ? "20px" : "-20px", "0px"],
          }}
          transition={{
            y: {
              duration: snowflake.duration,
              repeat: Infinity,
              ease: "linear",
              delay: snowflake.delay,
            },
            x: {
              duration: snowflake.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: snowflake.delay,
            },
          }}
        />
      ))}
    </div>
  );
}