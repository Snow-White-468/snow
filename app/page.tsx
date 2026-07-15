"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import Background from "@/components/home/Background";
import Countdown from "@/components/home/Countdown";
import LoveButton from "@/components/home/LoveButton";
import HeartBurst from "@/components/home/HeartBurst";
import DynamicIslandNav from "../components/home/DynamicIslandNav";
import FloatingDock from "../components/home/FloatingDock";
import CoupleSlider from "@/components/home/CoupleSlider";

interface WishItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  
  const [asifWishes, setAsifWishes] = useState<WishItem[]>([]);
  const [shanowarWishes, setShanowarWishes] = useState<WishItem[]>([]);
  const [asifInput, setAsifInput] = useState("");
  const [shanowarInput, setShanowarInput] = useState("");

  useEffect(() => {
    const savedAsif = localStorage.getItem("praxia_love_wish_asif");
    const savedShanowar = localStorage.getItem("praxia_love_wish_shanowar");
    
    requestAnimationFrame(() => {
      if (savedAsif) {
        setAsifWishes(JSON.parse(savedAsif));
      } else {
        setAsifWishes([
          { id: "a1", text: "Agli lambi romantic walk par jaana", completed: true },
          { id: "a2", text: "Ek khoobsurat candle-light dinner ka surprise", completed: false }
        ]);
      }

      if (savedShanowar) {
        setShanowarWishes(JSON.parse(savedShanowar));
      } else {
        setShanowarWishes([
          { id: "s1", text: "Sath baith kar shaam ki sukoon wali chai peena", completed: false }
        ]);
      }
    });
  }, []);

  const updateAsifWishes = (newWishes: WishItem[]) => {
    setAsifWishes(newWishes);
    localStorage.setItem("praxia_love_wish_asif", JSON.stringify(newWishes));
  };

  const updateShanowarWishes = (newWishes: WishItem[]) => {
    setShanowarWishes(newWishes);
    localStorage.setItem("praxia_love_wish_shanowar", JSON.stringify(newWishes));
  };

  const addWish = (owner: "asif" | "shanowar") => {
    if (owner === "asif") {
      if (!asifInput.trim()) return;
      const newItem = { id: `asif-${Date.now()}`, text: asifInput.trim(), completed: false };
      updateAsifWishes([...asifWishes, newItem]);
      setAsifInput("");
    } else {
      if (!shanowarInput.trim()) return;
      const newItem = { id: `shanowar-${Date.now()}`, text: shanowarInput.trim(), completed: false };
      updateShanowarWishes([...shanowarWishes, newItem]);
      setShanowarInput("");
    }
  };

  const toggleWish = (owner: "asif" | "shanowar", id: string) => {
    if (owner === "asif") {
      const updated = asifWishes.map(w => w.id === id ? { ...w, completed: !w.completed } : w);
      updateAsifWishes(updated);
    } else {
      const updated = shanowarWishes.map(w => w.id === id ? { ...w, completed: !w.completed } : w);
      updateShanowarWishes(updated);
    }
  };

  const deleteWish = (owner: "asif" | "shanowar", id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (owner === "asif") {
      const filtered = asifWishes.filter(w => w.id !== id);
      updateAsifWishes(filtered);
    } else {
      const filtered = shanowarWishes.filter(w => w.id !== id);
      updateShanowarWishes(filtered);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#f7ebf2] flex flex-col items-center justify-start pt-24 pb-36 p-4">
      <Background />
      <HeartBurst />

      <DynamicIslandNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Glass Box Converted to Primary Application Hero Section Frame */}
      <section className={`relative z-10 w-full bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:p-8 rounded-3xl shadow-[0_25px_50px_-12px_rgba(236,183,213,0.4)] flex flex-col items-center transition-all duration-500 mb-8 ${
        activeTab === "wishlist" ? "max-w-3xl" : "max-w-md text-center justify-center min-h-100 space-y-8"
      }`}>
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
          <div className="w-full space-y-6 animate-fadeIn text-center">
            <h3 className="text-xs font-bold tracking-widest text-[#e05297] uppercase mb-4">Future Canvas Bucket List</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
              {/* Asif Canvas */}
              <div className="bg-white/30 border border-white/50 p-4 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1d1d1f] tracking-wide uppercase border-b border-gray-200/60 pb-1 mb-3">Asif</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {asifWishes.map((wish) => (
                      <div 
                        key={wish.id} 
                        onClick={() => toggleWish("asif", wish.id)}
                        className="flex items-center justify-between gap-2 bg-white/60 border border-white p-2.5 rounded-xl cursor-pointer hover:bg-white/80 transition-all select-none group"
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] font-bold shrink-0 transition-all ${
                            wish.completed ? "bg-[#e05297] border-[#e05297] text-white" : "border-gray-400"
                          }`}>
                            {wish.completed && "✓"}
                          </div>
                          <span className={`text-xs font-semibold truncate ${wish.completed ? "line-through text-gray-400" : "text-[#1d1d1f]"}`}>
                            {wish.text}
                          </span>
                        </div>
                        <button 
                          onClick={(e) => deleteWish("asif", wish.id, e)}
                          className="text-gray-400 hover:text-red-500 text-[10px] font-bold p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-200/40 mt-auto">
                  <input 
                    type="text" 
                    placeholder="Apni khwaish likhein..." 
                    value={asifInput}
                    onChange={(e) => setAsifInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addWish("asif")}
                    className="flex-1 bg-white/80 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[#e05297] text-[#1d1d1f]"
                  />
                  <button 
                    onClick={() => addWish("asif")}
                    className="bg-[#e05297] text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#c93d7f] transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Shanowar Canvas */}
              <div className="bg-white/30 border border-white/50 p-4 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#e05297] tracking-wide uppercase border-b border-gray-200/60 pb-1 mb-3">Shanowar</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {shanowarWishes.map((wish) => (
                      <div 
                        key={wish.id} 
                        onClick={() => toggleWish("shanowar", wish.id)}
                        className="flex items-center justify-between gap-2 bg-white/60 border border-white p-2.5 rounded-xl cursor-pointer hover:bg-white/80 transition-all select-none group"
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] font-bold shrink-0 transition-all ${
                            wish.completed ? "bg-[#e05297] border-[#e05297] text-white" : "border-gray-400"
                          }`}>
                            {wish.completed && "✓"}
                          </div>
                          <span className={`text-xs font-semibold truncate ${wish.completed ? "line-through text-gray-400" : "text-[#1d1d1f]"}`}>
                            {wish.text}
                          </span>
                        </div>
                        <button 
                          onClick={(e) => deleteWish("shanowar", wish.id, e)}
                          className="text-gray-400 hover:text-red-500 text-[10px] font-bold p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-200/40 mt-auto">
                  <input 
                    type="text" 
                    placeholder="Apni khwaish likhein..." 
                    value={shanowarInput}
                    onChange={(e) => setShanowarInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addWish("shanowar")}
                    className="flex-1 bg-white/80 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[#e05297] text-[#1d1d1f]"
                  />
                  <button 
                    onClick={() => addWish("shanowar")}
                    className="bg-[#e05297] text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#c93d7f] transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Conditionally Render Couple Photo Slider Widget Directly Below Main Hero Box Only on Home View */}
      {activeTab === "home" && <CoupleSlider />}

      <FloatingDock activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}