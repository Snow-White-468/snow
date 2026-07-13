"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quote from "./Quote";

export default function LoveButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lazy initialize the audio layer only when interaction happens on client side
  const initAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio("/music/bg-romance.mp3");
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
    }
  };

  const handleOpenHeart = () => {
    setIsOpen(true);
    setIsUnlocked(false);
    setSecretInput("");
    
    // Explicit client gesture boundary step
    initAudio();

    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play blocked by browser validation:", err));
    }
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents layout modal handling conflicts
    initAudio();

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Toggle failure caught:", err));
    }
  };

  const checkSecretCode = (val: string) => {
    setSecretInput(val);
    if (val === "0607") {
      setIsUnlocked(true);
    }
  };

  // Safely cleanup audio processing context on teardown
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenHeart}
          className="rounded-full bg-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-600/30 cursor-pointer transition-colors hover:bg-pink-700"
        >
          Open My Heart ❤️
        </motion.button>

        {/* Dynamic Music Status Pill Control */}
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={toggleMusic}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-pink-400 cursor-pointer hover:bg-white/10"
          >
            <span className="flex gap-0.5 items-end h-3 w-4">
              <span className="bg-pink-500 w-0.5 animate-[pulse_0.8s_infinite] h-full" />
              <span className="bg-pink-500 w-0.5 animate-[pulse_0.5s_infinite] h-3/4" />
              <span className="bg-pink-500 w-0.5 animate-[pulse_0.9s_infinite] h-1/2" />
            </span>
            Music Playing
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-neutral-900/90 border border-pink-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl space-y-6 z-10"
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={toggleMusic}
                  className="text-gray-400 hover:text-white text-sm bg-white/5 p-2 rounded-xl border border-white/5 cursor-pointer"
                >
                  {isPlaying ? "🔇 Mute" : "🔊 Unmute"}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white text-xl p-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto border border-pink-500/20 shadow-inner">
                <span className="text-2xl animate-pulse">{isUnlocked ? "✨" : "💝"}</span>
              </div>

              <Quote />

              <div className="pt-4 border-t border-white/5 space-y-3">
                {!isUnlocked ? (
                  <>
                    <p className="text-xs text-gray-400">Enter our special anniversary date to unlock a secret...</p>
                    <input 
                      type="password"
                      maxLength={4}
                      placeholder="MMDD"
                      value={secretInput}
                      onChange={(e) => checkSecretCode(e.target.value)}
                      className="w-24 bg-black/50 border border-pink-500/30 rounded-lg py-1 px-2 text-center text-white placeholder-gray-600 focus:outline-none focus:border-pink-500 text-sm tracking-widest"
                    />
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-xl"
                  >
                    <p className="text-sm font-semibold text-pink-400">🔒 Secret Vault Unlocked!</p>
                    <p className="text-xs text-gray-200 mt-1 italic">
                      {`"Romeo & Juliet were just a story, Asif & Shanowar are real forever."`}
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="pt-2 text-[10px] text-gray-500">
                Created securely with code & infinity love by Asif Jamil
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}