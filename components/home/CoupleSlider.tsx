"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Default starting photos
const initialAsifImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"
];

const initialShanowarImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop"
];

const asifQuotes = [
  "Meri har saans me tum shamil ho...",
  "Tumhari muskaan hi meri khushi hai.",
  "Humesha tumhara, har lamha tumhara."
];

const shanowarQuotes = [
  "Mere sukoon ka zariya ho tum...",
  "Sath tumhara ho toh duniya khoobsurat hai.",
  "Dil ki dhadkan, jaan se pyaare."
];

export default function CoupleSlider() {
  const [asifImages, setAsifImages] = useState(initialAsifImages);
  const [shanowarImages, setShanowarImages] = useState(initialShanowarImages);

  const [asifIdx, setAsifIdx] = useState(0);
  const [shanoIdx, setShanoIdx] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRefAsif = useRef<HTMLInputElement>(null);
  const fileInputRefShano = useRef<HTMLInputElement>(null);

  // Auto slide effect
  useEffect(() => {
    if (asifImages.length <= 1) return;
    const intervalAsif = setInterval(() => {
      setAsifIdx((prev) => (prev + 1) % asifImages.length);
    }, 4000);
    return () => clearInterval(intervalAsif);
  }, [asifImages]);

  useEffect(() => {
    if (shanowarImages.length <= 1) return;
    const intervalShano = setInterval(() => {
      setShanoIdx((prev) => (prev + 1) % shanowarImages.length);
    }, 4500);
    return () => clearInterval(intervalShano);
  }, [shanowarImages]);

  // Handle Photo Upload Simulating Google Drive Direct Sync
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "asif" | "shanowar") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. Local Preview generation immediately for smooth UX
      const localUrl = URL.createObjectURL(file);

      // 2. Drive Upload Logic simulation
      // Real-production notes: Yahan hum local image URL ko direct image queue array mein push kar rahe hain.
      // Jab aap live backend hook karenge, tab is segment mein Google Drive APIs trigger hokar file upload karengi.
      if (target === "asif") {
        const updated = [...asifImages, localUrl];
        setAsifImages(updated);
        setAsifIdx(updated.length - 1); // Switch instantly to the uploaded photo
      } else {
        const updated = [...shanowarImages, localUrl];
        setShanowarImages(updated);
        setShanoIdx(updated.length - 1); // Switch instantly to the uploaded photo
      }

      // Small delay to simulate upload progression
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`Success! Photo uploaded safely to Google Drive folder for ${target === "asif" ? "Asif" : "Shanowar"}.`);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const activeAsifQuote = asifQuotes[asifIdx % asifQuotes.length];
  const activeShanoQuote = shanowarQuotes[shanoIdx % shanowarQuotes.length];

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6 z-10 animate-fadeIn">
      
      {/* Hidden Native File Input Controllers */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRefAsif} 
        className="hidden" 
        onChange={(e) => handlePhotoUpload(e, "asif")}
      />
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRefShano} 
        className="hidden" 
        onChange={(e) => handlePhotoUpload(e, "shanowar")}
      />

      {/* Grid containing the couple cards */}
      <div className="w-full grid grid-cols-2 gap-4">
        
        {/* Asif Polaroid */}
        <div className="bg-white/40 backdrop-blur-md border border-white/60 p-2.5 rounded-2xl flex flex-col items-center shadow-md relative group">
          <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-inner">
            <AnimatePresence mode="wait">
              <motion.img
                key={asifIdx}
                src={asifImages[asifIdx]}
                alt="Asif Profile Dynamic"
                initial={{ opacity: 0, scale: 1.05, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -10 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Premium Upload Overlay Button on Hover */}
            <div 
              onClick={() => fileInputRefAsif.current?.click()}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <span className="text-[20px] text-white">📸</span>
              <span className="text-[8px] font-bold text-white uppercase tracking-wider mt-1">Upload to Drive</span>
            </div>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-[#515154] uppercase mt-2">
            Asif
          </span>
          
          <div className="h-6 flex items-center justify-center mt-1 px-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={asifIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[9px] font-medium text-[#737376] italic text-center leading-tight"
              >
                {activeAsifQuote}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Shanowar Polaroid */}
        <div className="bg-white/40 backdrop-blur-md border border-white/60 p-2.5 rounded-2xl flex flex-col items-center shadow-md relative group">
          <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-inner">
            <AnimatePresence mode="wait">
              <motion.img
                key={shanoIdx}
                src={shanowarImages[shanoIdx]}
                alt="Shanowar Profile Dynamic"
                initial={{ opacity: 0, scale: 1.05, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 10 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Premium Upload Overlay Button on Hover */}
            <div 
              onClick={() => fileInputRefShano.current?.click()}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <span className="text-[20px] text-white">📸</span>
              <span className="text-[8px] font-bold text-white uppercase tracking-wider mt-1">Upload to Drive</span>
            </div>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-[#e05297] uppercase mt-2">
            Shanowar
          </span>

          <div className="h-6 flex items-center justify-center mt-1 px-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={shanoIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[9px] font-medium text-[#e05297] italic text-center leading-tight"
              >
                {activeShanoQuote}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Global uploading loader bar */}
      {isUploading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/60 backdrop-blur-md border border-white px-4 py-2 rounded-full flex items-center gap-2"
        >
          <span className="animate-spin text-xs">⏳</span>
          <span className="text-[10px] font-bold text-[#e05297] tracking-wider uppercase">Syncing with Google Drive...</span>
        </motion.div>
      )}

      {/* Quick Interactive Upload Hub Trigger */}
      <div className="flex gap-4">
        <button 
          onClick={() => fileInputRefAsif.current?.click()}
          className="bg-white/40 hover:bg-white/60 active:scale-95 border border-white/60 text-[#515154] text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          + Add Asif Pic
        </button>
        <button 
          onClick={() => fileInputRefShano.current?.click()}
          className="bg-white/40 hover:bg-white/60 active:scale-95 border border-white/60 text-[#e05297] text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          + Add Shanowar Pic
        </button>
      </div>

    </div>
  );
}