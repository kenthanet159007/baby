import { Heart, Sparkles, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";

export function WelcomeStep({
  welcome,
  onNext,
}: {
  welcome: { title: string; subtitle: string; button: string };
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 items-center">
      <GlassPanel className="welcome-masterpiece relative overflow-hidden text-center">
        <div className="welcome-spotlight pointer-events-none absolute inset-0" />
        <div className="gift-rays pointer-events-none absolute inset-0" />
        <div className="welcome-constellation pointer-events-none absolute inset-0" />
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-rose-400 shadow-sm backdrop-blur"
        >
          <Sparkles size={13} />
          private surprise
        </motion.div>
        <motion.div
          initial={{ scale: 0.78, rotate: -8 }}
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2], scale: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hero-gift mx-auto mb-7 grid h-36 w-36 place-items-center overflow-hidden rounded-[38px] bg-white/45 shadow-[0_30px_80px_rgba(244,114,182,.38)]"
        >
          <Image
            src="/images/S__51822624.svg"
            alt="รูปความทรงจำพิเศษ"
            width={144}
            height={144}
            unoptimized
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-3 py-1 text-xs font-black text-rose-400 shadow-sm backdrop-blur">
          <WandSparkles size={14} />
          For one special person
        </div>
        <h1 className="welcome-title text-balance text-[40px] font-black leading-[1.03] text-rose-600 drop-shadow-sm">
          {welcome.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xs text-pretty text-[15px] font-semibold leading-7 text-rose-700/78">
          {welcome.subtitle}
        </p>

        <div className="mt-7 grid grid-cols-3 gap-2">
          {["made", "only", "for you"].map((label, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.12 }}
              className="rounded-2xl border border-white/70 bg-white/55 px-2 py-3 text-center shadow-sm backdrop-blur"
            >
              <Heart
                size={13}
                fill="currentColor"
                className="mx-auto mb-1 text-rose-300"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-rose-400">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <LoveButton onClick={onNext} className="mt-7 w-full" variant="gold">
          {welcome.button}
        </LoveButton>
      </GlassPanel>
    </div>
  );
}
