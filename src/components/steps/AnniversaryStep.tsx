"use client";

import { CalendarHeart, Heart, LockKeyhole, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";

type DodgeState = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

function makeDodge(day: number, attempt: number): DodgeState {
  const wave = Math.sin((day * 17 + attempt * 31) * 0.57);
  const bounce = Math.cos((day * 11 + attempt * 23) * 0.41);
  const direction = wave >= 0 ? 1 : -1;
  const vertical = bounce >= 0 ? 1 : -1;

  return {
    x: direction * (20 + Math.abs(wave) * 28 + (day % 4) * 3),
    y: vertical * (12 + Math.abs(bounce) * 24),
    rotate: direction * (8 + Math.abs(wave - bounce) * 12),
    scale: 0.92 + Math.abs(wave * bounce) * 0.14,
  };
}

export function AnniversaryStep({
  correctDay,
  hints,
  onNext,
}: {
  correctDay: number;
  hints: string[];
  onNext: () => void;
}) {
  const [hint, setHint] = useState("วันไหนดีนะ :P");
  const [dodges, setDodges] = useState<Record<number, DodgeState>>({});
  const [boardShake, setBoardShake] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const dodgeAttemptRef = useRef(0);

  const days = useMemo(() => Array.from({ length: 31 }, (_, index) => index + 1), []);

  const moveWrongDay = (day: number) => {
    if (day === correctDay || isAccepted) return;

    setDodges((current) => ({
      ...current,
      [day]: makeDodge(day, dodgeAttemptRef.current),
    }));
    dodgeAttemptRef.current += 1;
  };

  const chooseDay = (day: number) => {
    if (isAccepted) return;

    if (day === correctDay) {
      setIsAccepted(true);
      setHint(`งั้นวันที่ ${correctDay} คือวันของเรานะ 💕`);
      window.setTimeout(onNext, 1400);
      return;
    }

    moveWrongDay(day);
    const nextShake = boardShake + 1;
    setBoardShake(nextShake);
    setHint(hints[(day + nextShake) % hints.length] ?? "ลองใหม่อีกทีสิ");
  };

  return (
    <div className="flex flex-1 items-center">
      <GlassPanel className="anniversary-scene anniversary-deluxe">
        <div className="secret-date-orbits pointer-events-none absolute inset-0" />

        <div className="relative mb-5 text-center">
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-[24px] bg-gradient-to-br from-white via-rose-50 to-pink-100 text-rose-500 shadow-[0_18px_40px_rgba(244,114,182,.24)]"
          >
            <CalendarHeart size={31} />
          </motion.div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-3 py-1 text-xs font-black text-rose-400 shadow-sm backdrop-blur">
            <LockKeyhole size={13} />
            Secret anniversary
            <Sparkles size={13} />
          </div>

          <h2 className="anniversary-title text-balance text-[28px] font-black leading-tight text-rose-600">
            เลือกวันครบรอบซะ Baby
          </h2>
          <p className="mx-auto mt-3 min-h-12 max-w-xs rounded-[22px] border border-white/70 bg-white/62 px-4 py-3 text-sm font-black leading-6 text-rose-500 shadow-sm backdrop-blur">
            {hint}
          </p>
        </div>

        <motion.div
          key={boardShake}
          animate={
            boardShake
              ? { x: [0, -7, 8, -5, 4, 0], rotate: [0, -1.5, 1.5, -1, 0.5, 0] }
              : { x: 0, rotate: 0 }
          }
          transition={{ duration: 0.35 }}
          className="chaos-calendar deluxe-calendar relative rounded-[34px] border border-white/75 bg-white/42 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.75),0_20px_60px_rgba(244,114,182,.2)] backdrop-blur"
        >
          <div className="mb-3 grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div
                key={`${day}-${index}`}
                className="grid h-8 place-items-center rounded-full bg-white/60 text-[11px] font-black text-rose-300 shadow-sm"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
              const dodge = dodges[day] ?? { x: 0, y: 0, rotate: 0, scale: 1 };
              return (
                <motion.button
                  key={day}
                  type="button"
                  onMouseEnter={() => moveWrongDay(day)}
                  onFocus={() => moveWrongDay(day)}
                  onPointerDown={() => moveWrongDay(day)}
                  onClick={() => chooseDay(day)}
                  animate={{
                    x: dodge.x,
                    y: dodge.y,
                    rotate: dodge.rotate,
                    scale: dodge.scale,
                  }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 360, damping: 16 }}
                  className="calendar-chaos-day relative aspect-square rounded-2xl border border-white/75 bg-gradient-to-br from-white/95 via-rose-50/90 to-pink-50/90 text-sm font-black text-rose-500 shadow-[0_8px_18px_rgba(244,114,182,.16)] outline-none transition hover:shadow-[0_14px_24px_rgba(244,114,182,.24)] focus-visible:ring-2 focus-visible:ring-rose-300"
                  aria-label={`เลือกวันที่ ${day}`}
                >
                  <span className="relative z-10">{day}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-rose-50/70 px-4 py-2 text-xs font-bold text-rose-400">
          <Heart size={14} fill="currentColor" />
          ไม่มีใบ้บนเลขนะ ต้องกดหาเองจริง ๆ
        </div>

        {isAccepted && (
          <LoveButton className="mt-5 w-full" variant="gold" disabled>
            กำลังพาไปดูเรื่องของเรา…
          </LoveButton>
        )}
      </GlassPanel>
    </div>
  );
}
