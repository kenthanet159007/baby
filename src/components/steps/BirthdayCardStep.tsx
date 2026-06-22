import { Cake, Heart, Quote, Ribbon } from "lucide-react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";

export function BirthdayCardStep({
  lines,
  onNext,
}: {
  lines: string[];
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 items-center">
      <GlassPanel className="birthday-card-stage relative overflow-hidden">
        <div className="absolute inset-x-8 top-4 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
        <div className="mb-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50/80 px-3 py-1 text-xs font-black text-amber-600 shadow-sm">
            <Ribbon size={13} />
            Birthday Card
          </span>
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="grid h-10 w-10 place-items-center rounded-full bg-pink-100 text-rose-500"
          >
            <Cake size={21} />
          </motion.span>
        </div>
        <motion.div
          initial={{ rotateX: -12, y: 18, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="birthday-letter premium-letter relative rounded-[30px] bg-gradient-to-b from-white via-rose-50/90 to-amber-50/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_18px_40px_rgba(244,114,182,.18)]"
        >
          <div className="wax-seal absolute -top-4 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg">
            <Heart fill="currentColor" size={17} />
          </div>
          <div className="mb-4 mt-3 flex justify-center text-rose-300">
            <Quote size={28} />
          </div>
          <div className="space-y-4 text-center">
            {lines.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.25 }}
                className={`birthday-card-line text-pretty leading-8 text-rose-900/82 ${
                  index === 0 ? "text-[18px] font-black" : "text-[15px] font-semibold"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
        <LoveButton onClick={onNext} className="mt-7 w-full">
          ต่อไป
        </LoveButton>
      </GlassPanel>
    </div>
  );
}
