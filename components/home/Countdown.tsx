"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  
  const [loveThoughtsCount, setLoveThoughtsCount] = useState<number>(0);

  useEffect(() => {
    const targetDate = new Date("2026-06-07T00:00:00");

    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });

      const baselinePastDate = new Date("2024-01-01T00:00:00");
      const secondsElapsedSinceBaseline = Math.floor((now.getTime() - baselinePastDate.getTime()) / 1000);
      setLoveThoughtsCount(secondsElapsedSinceBaseline * 2);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="w-full bg-neutral-900/40 border border-white/5 backdrop-blur-md rounded-3xl p-6 shadow-xl text-center space-y-4">
        <p className="text-xs font-semibold tracking-wider text-pink-500 uppercase flex items-center justify-center gap-1">
          Days of Pure Love Together ❤️
        </p>

        <div className="grid grid-cols-4 gap-2">
          {timeBlocks.map((block) => (
            <div 
              key={block.label} 
              className="... flex-col items-center justify-center min-w-17.5"
            >
              <span className="text-2xl font-bold font-mono tracking-tight text-white transition-all duration-300">
                {block.value}
              </span>
              <span className="text-[10px] tracking-wide text-gray-500 font-medium mt-0.5">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center py-2 px-4 rounded-full bg-pink-500/5 border border-pink-500/10 backdrop-blur-sm shadow-inner"
      >
        <p className="text-[11px] font-medium text-gray-400 tracking-wide">
          Humne ek dusre ko abhi tak{" "}
          <span className="font-mono text-xs font-bold text-pink-400 mx-1">
            ~{loveThoughtsCount.toLocaleString()}
          </span>{" "}
          baar apni saanso mein yaad kiya hai ✨
        </p>
      </motion.div>
    </div>
  );
}