"use client";

import { HeartHandshake, MessageCircleHeart, SmilePlus } from "lucide-react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";

export function PreQuestionStep({
  lines,
  onNext,
}: {
  lines: string[];
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 items-center">
      <GlassPanel className="shy-question-scene text-center">
        <div className="blush-clouds pointer-events-none absolute inset-0" />
        <motion.div
          animate={{ rotate: [-4, 4, -4], y: [0, -7, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-[30px] bg-gradient-to-br from-white via-rose-50 to-pink-100 text-rose-500 shadow-[0_18px_44px_rgba(244,114,182,.24)]"
        >
          <HeartHandshake size={30} />
        </motion.div>
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-black text-rose-400 shadow-sm">
          <MessageCircleHeart size={14} />
          ขอเขินอีกนิดนึง
        </div>
        <div className="shy-message-stack space-y-3">
          {lines.map((line, index) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.45 }}
              className="shy-bubble mx-auto w-fit max-w-full rounded-[24px] border border-white/70 bg-white/62 px-4 py-3 text-base font-black leading-7 text-rose-700 shadow-sm backdrop-blur"
            >
              {line}
            </motion.p>
          ))}
        </div>
        <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-rose-50/70 px-3 py-1 text-xs font-black text-rose-400">
          <SmilePlus size={14} />
          ถามแล้วอย่าหัวเราะนะ
        </div>
        <LoveButton onClick={onNext} className="mt-8 w-full">
          ถามมาเลย
        </LoveButton>
      </GlassPanel>
    </div>
  );
}
