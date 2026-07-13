import Welcome from "./Welcome";
import LoveButton from "./LoveButton";
import Background from "./Background";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-12 px-4">
      {/* Background layer including ambient glow, snow, and floating hearts */}
      <Background />

      {/* Structured Content UI Container */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg">
        <Welcome />
        <LoveButton />
        <Countdown />
      </div>
    </main>
  );
}