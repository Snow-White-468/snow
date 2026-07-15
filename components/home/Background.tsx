"use client";

import FloatingHearts from "./FloatingHearts";
import SnowEffect from "./SnowEffect";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-linear-to-b from-[#cce0ee] via-[#fcdceb] to-[#f3cbdf]">
      {/* Liquid Organic Apple Styled Blurred Orbs for Visual Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] bg-[#b8daf0]/50 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[60%] bg-[#f3b5d7]/40 rounded-full filter blur-[120px]" />
      
      {/* Translucent ambient structures falling */}
      <SnowEffect />
      <FloatingHearts />
    </div>
  );
}