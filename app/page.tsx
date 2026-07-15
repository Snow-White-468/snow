"use client";

import Hero from "@/components/home/Hero";
import Background from "@/components/home/Background";
import Countdown from "@/components/home/Countdown";
import LoveButton from "@/components/home/LoveButton";
import HeartBurst from "@/components/home/HeartBurst";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-[#dae9f4] via-[#f7d6e6] to-[#ecb7d5] text-[#1d1d1f] flex flex-col items-center justify-center p-4 space-y-8">
      {/* Dynamic Visual Content Layout */}
      <Background />
      <HeartBurst />

      {/* Apple UI Grid Overlay Box */}
      <div className="z-10 flex flex-col items-center justify-center w-full space-y-8 max-w-xl bg-white/30 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-[0_20px_50px_rgba(236,183,213,0.3)]">
        <Hero />
        <Countdown />
        <LoveButton />
      </div>
    </main>
  );
}