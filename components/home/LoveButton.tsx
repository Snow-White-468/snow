"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quote from "./Quote";

// Personal highly customized emotional letters dataset configuration layers
const secretLetters = [
  {
    id: "letter-1",
    tag: "💌 Pehla Khat: Shuruat",
    content: "Shanowar, tum meri zindagi ka wo haseen tohfa ho jise khuda ne mere liye chuna. Jab se tum meri life mein aayi ho, har din ek khoobsurat kahani jaisa lagta hai."
  },
  {
    id: "letter-2",
    tag: "💖 Doosra Khat: Humsafar",
    content: "Ek professional digital world mein rehte hue bhi, mera real sukoon sirf tumhare sath bitaye lamho mein hai. Tumhara har kadam par sath dena mere liye sabse badi taqat hai."
  },
  {
    id: "letter-3",
    tag: "✨ Teesra Khat: Hamesha K Liye",
    content: "Waqt chahe badle ya duniya, Asif aur Shanowar ki ye real love story humesha is universe mein sabse alag aur pure rahegi. I love you forever and always."
  }
];

export default function LoveButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quoteTriggerKey, setQuoteTriggerKey] = useState(0);
  
  // Track currently expanded secret letter envelope item block
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenHeart = () => {
    setIsOpen(true);
    setIsUnlocked(false);
    setSecretInput("");
    setActiveLetterId(null);
    setQuoteTriggerKey(prev => prev + 1);
    
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Native audio blocked:", err));
    }
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Native play failed:", err));
    }
  };

  const checkSecretCode = (val: string) => {
    setSecretInput(val);
    if (val === "0607") {
      setIsUnlocked(true);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop 
        preload="auto"
      />

      <div className="flex flex-col items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenHeart}
          className="rounded-full bg-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-600/30 cursor-pointer transition-colors hover:bg-pink-700"
        >
          Open My Heart ❤️
        </motion.button>

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md 'fixed'"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-neutral-900/90 border border-pink-500/30 rounded-3xl p-6 max-w-md w-full text-center shadow-2xl space-y-6 z-10 my-auto max-h-[90vh] overflow-y-auto scrollbar-none"
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={toggleMusic}
                  className="text-gray-400 hover:text-white text-xs bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 cursor-pointer"
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

              <div className="w-14 h-14 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto border border-pink-500/20 shadow-inner mt-4">
                <span className="text-xl animate-pulse">{isUnlocked ? "✨" : "💝"}</span>
              </div>

              <Quote key={quoteTriggerKey} />

              <div className="pt-4 border-t border-white/5 space-y-4">
                {!isUnlocked ? (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400">Enter our special anniversary date to unlock a secret...</p>
                    <input 
                      type="password"
                      maxLength={4}
                      placeholder="MMDD"
                      value={secretInput}
                      onChange={(e) => checkSecretCode(e.target.value)}
                      className="w-24 bg-black/50 border border-pink-500/30 rounded-lg py-1 px-2 text-center text-white placeholder-gray-600 focus:outline-none focus:border-pink-500 text-sm tracking-widest"
                    />
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 text-left w-full"
                  >
                    <p className="text-xs font-semibold text-pink-400 text-center uppercase tracking-wide">
                      🔒 Secret Fortune Vault Unlocked!
                    </p>
                    
                    {/* Render dynamic list stack layout elements */}
                    <div className="space-y-2 mt-2">
                      {secretLetters.map((letter) => (
                        <div key={letter.id} className="bg-black/40 border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
                          <button
                            onClick={() => setActiveLetterId(activeLetterId === letter.id ? null : letter.id)}
                            className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-200 flex justify-between items-center hover:bg-white/5 cursor-pointer"
                          >
                            <span>{letter.tag}</span>
                            <span className="text-[10px] text-pink-400">
                              {activeLetterId === letter.id ? "▲ Close" : "▼ Open"}
                            </span>
                          </button>
                          
                          <AnimatePresence>
                            {activeLetterId === letter.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-4 pb-3 pt-1 border-t border-white/5 text-[11px] text-gray-400 italic leading-relaxed"
                              >
                                {letter.content}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
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