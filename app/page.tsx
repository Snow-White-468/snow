"use client";

import Hero from "@/components/home/Hero";
import Background from "@/components/home/Background";
import SnowEffect from "@/components/home/SnowEffect";
import Countdown from "@/components/home/Countdown";
import LoveButton from "@/components/home/LoveButton";
import HeartBurst from "@/components/home/HeartBurst";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center p-4 space-y-8">
      {/* Structural Visual Ambient Background Layers */}
      <Background />
      <SnowEffect />
      
      {/* Global Interactive Canvas Mouse Click Burst Module */}
      <HeartBurst />

      {/* Main UI Application Frame Layout Component Stack */}
      <div className="z-10 flex flex-col items-center justify-center w-full space-y-8">
        <Hero />
        <Countdown />
        <LoveButton />
      </div>
    </main>
  );
}