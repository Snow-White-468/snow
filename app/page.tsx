"use client";

import { useState } from "react";
import Hero from "@/components/home/Hero";
import Background from "@/components/home/Background";
import Countdown from "@/components/home/Countdown";
import LoveButton from "@/components/home/LoveButton";
import HeartBurst from "@/components/home/HeartBurst";
import DynamicIslandNav from "../components/home/DynamicIslandNav";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#f7ebf2] flex flex-col items-center justify-start pt-24 p-4">
      <Background />
      <HeartBurst />

      {/* Top Dynamic Island Morphing Menu Navigation Element */}
      <DynamicIslandNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Luxury Frosted Glass Main Application Frame Layout */}
      <div className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:p-8 rounded-3xl shadow-[0_25px_50px_-12px_rgba(236,183,213,0.4)] flex flex-col items-center text-center space-y-8 min-h-100 justify-center transition-all duration-500">
        {activeTab === "home" && (
          <>
            <Hero />
            <LoveButton />
            <Countdown />
          </>
        )}

        {activeTab === "memories" && (
          <div className="w-full space-y-4 text-left animate-fadeIn">
            <h3 className="text-xs font-bold tracking-widest text-[#e05297] uppercase text-center mb-2">Our Memory Frame</h3>
            <div className="bg-white/50 border border-white/60 p-4 rounded-2xl text-xs font-medium text-[#515154] italic">
              {`"Wo pehli mulaqat, jahan waqt ruk gaya tha aur tumhari muskaan ne meri poori duniya badal di."`}
            </div>
            <div className="bg-white/50 border border-white/60 p-4 rounded-2xl text-xs font-medium text-[#515154] italic">
              {`"Wo ghanton lambi baatein jab lagta tha raat khatam na ho par kehne ko baatein bachi rahein."`}
            </div>
          </div>
        )}

        {activeTab === "wishlist" && (
          <div className="w-full space-y-3 text-left animate-fadeIn">
            <h3 className="text-xs font-bold tracking-widest text-[#e05297] uppercase text-center mb-2">Future Canvas</h3>
            {[
              "Agli lambi romantic walk par jaana",
              "Ek khoobsurat candle-light dinner ka surprise",
              "Sath baith kar shaam ki sukoon wali chai peena"
            ].map((wish, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/40 border border-white/50 p-3 rounded-xl">
                <div className="w-4 h-4 rounded-md border-2 border-[#e05297]/40 flex items-center justify-center text-[10px] text-[#e05297]">✓</div>
                <span className="text-xs font-semibold text-[#1d1d1f]">{wish}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}