"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [totalSecondsSpent, setTotalSecondsSpent] = useState<number>(0);

  useEffect(() => {
    // 06 June 2026 as the base anniversary parameter link reference
    const targetDate = new Date("2026-06-06T00:00:00");

    const calculateTime = () => {
      const difference = +new Date() - +targetDate;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });

        // 18 breaths per minute scale factor simulation metric calculation
        const seconds = Math.floor(difference / 1000);
        setTotalSecondsSpent(seconds);
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalBreaths = Math.floor((totalSecondsSpent / 60) * 18);

  return (
    <div className="w-full space-y-6">
      <div className="space-y-1">
        <h3 className="text-xs font-bold tracking-widest text-[#e05297] uppercase">
          Time Spent In Pure Love Together
        </h3>
      </div>

      {/* Grid Layout Stack Mapping Grid */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-sm mx-auto">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds }
        ].map((item) => (
          <div 
            key={item.label} 
            className="bg-white/40 border border-white/50 rounded-2xl p-3 flex flex-col items-center justify-center shadow-xs"
          >
            <span className="text-2xl font-bold text-[#1d1d1f] tabular-nums tracking-tight">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-semibold text-[#515154] uppercase tracking-wider mt-0.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Micro Metrics Heartbeat Text Data Metric Layer */}
      <div className="bg-white/30 border border-white/40 rounded-2xl p-4 max-w-sm mx-auto shadow-xs">
        <p className="text-xs font-medium text-[#515154] leading-relaxed">
          Humne ek dusre ko abhi tak{" "}
          <span className="text-[#e05297] font-bold tabular-nums">
            ~{totalBreaths.toLocaleString()}
          </span>{" "}
          baar apni saanso mein yaad kiya hai
        </p>
      </div>
    </div>
  );
}