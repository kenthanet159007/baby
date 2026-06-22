import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";

export function FinaleStep({
  finale,
  onReplay,
}: {
  finale: { lines: string[]; replayButton: string };
  onReplay: () => void;
}) {
  return (
    <div className="flex flex-1 items-center">
      <GlassPanel className="finale-masterpiece relative overflow-hidden text-center">
        <div className="sparkle-field confetti-rain pointer-events-none absolute inset-0" />
        <div className="finale-radiance pointer-events-none absolute inset-0" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -4, 4, 0], y: [0, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-pink-200 via-rose-300 to-fuchsia-300 text-white shadow-[0_24px_70px_rgba(244,114,182,.42)]"
        >
          <Heart fill="currentColor" size={38} />
        </motion.div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-400">
          <Sparkles size={14} />
          Happy Our Day
        </div>
        <div className="space-y-4">
          {finale.lines.map((line, index) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.25 }}
              className={`text-balance font-black leading-8 ${
                index === finale.lines.length - 1
                  ? "text-2xl text-rose-600"
                  : "text-lg text-rose-700"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-black text-rose-400 shadow-sm">
          <Sparkles size={15} />
          saved as our little universe
        </div>
        <LoveButton onClick={onReplay} variant="soft" className="mt-8 w-full gap-2">
          <RotateCcw size={17} />
          {finale.replayButton}
        </LoveButton>
      </GlassPanel>
    </div>
  );
}
