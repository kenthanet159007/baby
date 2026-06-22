"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Music2, PartyPopper, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";
import { playMiniMelody } from "@/lib/miniMelody";

export function AcceptedCelebrationStep({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    playMiniMelody({ volume: 0.06, wave: "triangle", tempo: 0.11 });
  }, []);

  return (
    <div className="flex flex-1 items-center">
      <GlassPanel className="accepted-celebration relative min-h-[640px] text-center">
        <div className="finale-radiance pointer-events-none absolute inset-0" />
        <div className="confetti-rain pointer-events-none absolute inset-0" />
        <div className="firework-burst pointer-events-none absolute inset-0" />
        <div className="heart-burst pointer-events-none absolute inset-0 grid place-items-center">
          {Array.from({ length: 34 }).map((_, index) => (
            <span key={index} style={{ "--i": index } as CSSProperties}>
              💖
            </span>
          ))}
        </div>

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -3, 3, 0],
            y: [0, -8, 0],
          }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-4 grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-amber-100 via-white to-pink-100 text-rose-500 shadow-[0_30px_90px_rgba(244,114,182,.38)]"
        >
          <HeartHandshake fill="currentColor" size={62} />
        </motion.div>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1 text-xs font-black text-rose-400 shadow-sm backdrop-blur">
          <Music2 size={14} />
          mini love song unlocked
          <Sparkles size={14} />
        </div>

        <h2 className="accepted-title mx-auto mt-4 max-w-xs text-balance text-[50px] font-black leading-[1] text-rose-600">
          เป็นแฟนกันแล้วนะ
        </h2>
        <p className="mx-auto mt-5 max-w-xs text-sm font-semibold leading-7 text-rose-700/75">
          รักนะครับรักทุกวันคิดถึงทุกตลอดเอยู่แล้วหละ
        </p>

        <div className="mt-8 grid gap-3">
          <LoveButton onClick={onNext} className="w-full" variant="primary">
            <PartyPopper size={18} />
            ไปต่อกันเลย
          </LoveButton>
        </div>
      </GlassPanel>
    </div>
  );
}
