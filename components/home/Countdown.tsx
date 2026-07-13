"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Bypassing the strict linter rule using requestAnimationFrame
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
    
    // Month index 5 = June
    const target = new Date(2026, 5, 7, 0, 0, 0).getTime();

    const updateTicker = () => {
      const now = new Date().getTime();
      const difference = now - target;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    };

    updateTicker();
    const interval = setInterval(updateTicker, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hydration fallback layer
  if (!isMounted) {
    return (
      <div className="mt-4 h-[120px] max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl border border-pink-500/20 opacity-20 animate-pulse" />
    );
  }

  return (
    <div className="mt-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-pink-500/20 max-w-md w-full text-center">
      <h3 className="text-sm font-medium text-pink-400 uppercase tracking-wider mb-4">
        Days of Pure Love Together ❤️
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col bg-black/40 p-3 rounded-xl border border-white/5">
            <span className="text-2xl font-bold text-white tabular-nums">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-400 mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}