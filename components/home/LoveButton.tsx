"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quote from "./Quote";

const lettersPool = [
  "Shanowar, tum meri zindagi ka wo haseen tohfa ho jise khuda ne mere liye chuna. Jab se tum meri life mein aayi ho, har din ek khoobsurat kahani jaisa lagta hai.",
  "Ek professional digital world mein rehte hue bhi, mera real sukoon sirf tumhare sath bitaye lamho mein hai. Tumhara har kadam par sath dena mere liye sabse badi taqat hai.",
  "Waqt chahe badle ya duniya, Asif aur Shanowar ki ye real love story humesha is universe mein sabse alag aur pure rahegi. I love you forever and always.",
  "Tumhari muskaan hi meri poori duniya ka sukoon hai. Jab tum hansti ho, toh lagta hai saari pareshaniyan ek pal mein gayab ho gayi hain.",
  "Zindagi mein bahut si khushiyan hain, par tumhare sath bitaya hua har ek chhota lamha mere liye sabse bada sukoon ban jata hai.",
  "Log kehte hain ki sacha pyaar sirf kahaniyon mein hota hai, par tumse milne ke baad mujhe yakeen hua ki sachai kahaniyon se bhi zyada khoobsurat hoti hai.",
  "Tum sirf meri hamsafar nahi ho, tum meri sabse acchi dost aur mera sabse bada support system ho. Shukriya meri life mein aane ke liye.",
  "Kayi baar main keh nahi pata, par tumhara mere sath hona hi mujhe har mushkil se ladne ki taqat deta hai. Tum meri taqat ho.",
  "Meri har subah tumhare khayal se shuru hoti hai aur har raat tumhare sukoon ki dua par khatam hoti hai. Tum meri poori duniya ho."
];

export default function LoveButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quoteTriggerKey, setQuoteTriggerKey] = useState(0);
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);
  
  const [todaysLetters, setTodaysLetters] = useState<{ id: string; tag: string; content: string }[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    const idx1 = dayOfYear % lettersPool.length;
    const idx2 = (dayOfYear + 2) % lettersPool.length;
    const idx3 = (dayOfYear + 5) % lettersPool.length;

    requestAnimationFrame(() => {
      setTodaysLetters([
        { id: "letter-1", tag: "Pehla Khat: Shuruat", content: lettersPool[idx1] },
        { id: "letter-2", tag: "Doosra Khat: Humsafar", content: lettersPool[idx2 === idx1 ? (idx2 + 1) % lettersPool.length : idx2] },
        { id: "letter-3", tag: "Teesra Khat: Hamesha K Liye", content: lettersPool[idx3 === idx1 || idx3 === idx2 ? (idx3 + 3) % lettersPool.length : idx3] }
      ]);
    });
  }, [isOpen]);

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
          className="rounded-full bg-[#e05297] px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-pink-200 cursor-pointer transition-colors hover:bg-[#c93d7f]"
        >
          Open My Heart
        </motion.button>

        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={toggleMusic}
            className="flex items-center gap-2 bg-white/60 border border-white/80 px-3 py-1 rounded-full text-xs text-[#e05297] font-medium cursor-pointer hover:bg-white/80 shadow-xs"
          >
            <span className="flex gap-0.5 items-end h-3 w-4">
              <span className="bg-[#e05297] w-0.5 h-full animate-[pulse_0.8s_infinite]" />
              <span className="bg-[#e05297] w-0.5 h-3/4 animate-[pulse_0.5s_infinite]" />
              <span className="bg-[#e05297] w-0.5 h-1/2 animate-[pulse_0.9s_infinite]" />
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
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white/80 border border-white/60 p-6 max-w-md w-full text-center shadow-2xl rounded-3xl z-10 my-auto max-h-[90vh] overflow-y-auto backdrop-blur-xl"
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={toggleMusic}
                  className="text-[#515154] hover:text-[#1d1d1f] text-xs bg-white/60 px-2.5 py-1 rounded-xl border border-white/80 font-medium cursor-pointer"
                >
                  {isPlaying ? "Mute" : "Unmute"}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[#515154] hover:text-[#1d1d1f] text-lg p-1 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mx-auto border border-pink-100 shadow-xs mt-4">
                <span className="text-xs font-bold text-[#e05297]">Vault</span>
              </div>

              <Quote key={quoteTriggerKey} />

              <div className="pt-4 border-t border-gray-200/60 space-y-4">
                {!isUnlocked ? (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[#515154]">Enter our special anniversary date to unlock a secret...</p>
                    <input 
                      type="password"
                      maxLength={4}
                      placeholder="MMDD"
                      value={secretInput}
                      onChange={(e) => checkSecretCode(e.target.value)}
                      className="w-24 bg-white/60 border border-gray-300 rounded-xl py-1 px-2 text-center text-[#1d1d1f] placeholder-gray-400 focus:outline-none focus:border-[#e05297] text-sm tracking-widest shadow-inner font-bold"
                    />
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 text-left w-full"
                  >
                    <p className="text-xs font-bold text-[#e05297] text-center uppercase tracking-wider">
                      Secret Fortune Vault Unlocked
                    </p>
                    
                    <div className="space-y-2 mt-2">
                      {todaysLetters.map((letter) => (
                        <div key={letter.id} className="bg-white/60 border border-white rounded-2xl overflow-hidden transition-all duration-300 shadow-xs">
                          <button
                            onClick={() => setActiveLetterId(activeLetterId === letter.id ? null : letter.id)}
                            className="w-full text-left px-4 py-3 text-xs font-bold text-[#1d1d1f] flex justify-between items-center hover:bg-white/40 cursor-pointer"
                          >
                            <span>{letter.tag}</span>
                            <span className="text-[10px] text-[#e05297] font-bold">
                              {activeLetterId === letter.id ? "Close" : "Open"}
                            </span>
                          </button>
                          
                          <AnimatePresence>
                            {activeLetterId === letter.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-4 pb-3 pt-1 border-t border-gray-100 text-xs text-[#515154] font-medium italic leading-relaxed"
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

              <div className="pt-2 text-[10px] font-medium text-gray-400">
                Created securely with code by Asif Jamil
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}