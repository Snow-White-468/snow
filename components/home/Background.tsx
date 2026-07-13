"use client";

import FloatingHearts from "./FloatingHearts";
import SnowEffect from "./SnowEffect";

export default function Background() {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden pointer-events-none z-0">
      {/* Premium subtle cinematic gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08)_0%,transparent_70%)]" />
      
      {/* Environmental visual effects */}
      <SnowEffect />
      <FloatingHearts />
    </div>
  );
}