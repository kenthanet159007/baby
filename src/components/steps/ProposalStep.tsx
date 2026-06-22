"use client";

import { Heart, Music2, Sparkles, Stars } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";
import { playMiniMelody } from "@/lib/miniMelody";

function makeDodge(attempt: number) {
  const wave = Math.sin((attempt + 1) * 1.73);
  const bounce = Math.cos((attempt + 1) * 2.21);
  const direction = wave >= 0 ? 1 : -1;

  return {
    x: direction * (34 + Math.abs(wave) * 42),
    y: bounce * 32,
    rotate: direction * (6 + Math.abs(bounce) * 12),
  };
}

export function ProposalStep({ onAccepted }: { onAccepted: () => void }) {
  const [avoidStyle, setAvoidStyle] = useState({ x: 0, y: 0, rotate: 0 });
  const [accepted, setAccepted] = useState(false);
  const dodgeAttemptRef = useRef(0);

  const dodge = () => {
    if (accepted) return;
    setAvoidStyle(makeDodge(dodgeAttemptRef.current));
    dodgeAttemptRef.current += 1;
  };

  const accept = () => {
    setAccepted(true);
    playMiniMelody({ volume: 0.09, wave: "triangle", tempo: 0.12 });
    window.setTimeout(onAccepted, 950);
  };

  return (
    <div className="flex flex-1 items-center">
      <GlassPanel className="proposal-masterpiece relative overflow-hidden text-center">
        <div className="proposal-halo pointer-events-none absolute inset-0" />
        <div className="proposal-fireworks pointer-events-none absolute inset-0" />
        {accepted && (
          <>
            <div className="firework-burst pointer-events-none absolute inset-0" />
            <div className="heart-burst pointer-events-none absolute inset-0 grid place-items-center">
              {Array.from({ length: 28 }).map((_, index) => (
                <span key={index} style={{ "--i": index } as CSSProperties}>
                  💖
                </span>
              ))}
            </div>
          </>
        )}

        <motion.div
          animate={{ scale: [1, 1.1, 1], y: [0, -7, 0], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="proposal-heart-crown mx-auto mb-5 grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-pink-100 via-white to-rose-100 text-rose-500 shadow-[0_26px_70px_rgba(244,114,182,.42)]"
        >
          <Heart fill="currentColor" size={48} />
        </motion.div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1 text-xs font-black text-rose-400 shadow-sm backdrop-blur">
          <Sparkles size={14} />
          the main question
          <Music2 size={14} />
        </div>

        <h2 className="proposal-title text-balance text-[52px] font-black leading-[0.98] text-rose-600">
          เป็นแฟนกันไหม? 💖
        </h2>
        <p className="mx-auto mt-4 max-w-xs text-sm font-semibold leading-6 text-rose-700/72">
          คงต้องกดตกลงแหละกดปุ่มอื่นไม่ได้ อิอิ
        </p>

        <div className="mt-8 grid gap-3">
          <LoveButton onClick={accept} disabled={accepted} className="w-full" variant="gold">
            <Stars size={18} />
            ตกลง
          </LoveButton>
          <motion.button
            type="button"
            onMouseEnter={dodge}
            onFocus={dodge}
            onPointerDown={dodge}
            animate={avoidStyle}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="min-h-12 rounded-full border border-rose-200 bg-white/78 px-6 py-3 text-sm font-black text-rose-400 shadow-[0_12px_26px_rgba(244,114,182,.14)] backdrop-blur transition active:scale-95"
          >
            ยังไม่ตอบได้ไหม
          </motion.button>
        </div>
      </GlassPanel>
    </div>
  );
}
