import type { ButtonHTMLAttributes, ReactNode } from "react";

type LoveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "soft" | "ghost" | "gold";
};

export function LoveButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: LoveButtonProps) {
  const variants = {
    primary: {
      edge: "from-rose-500 to-fuchsia-500",
      front: "from-rose-400 via-pink-400 to-fuchsia-400 text-white",
      glow: "bg-rose-300/45",
    },
    soft: {
      edge: "from-rose-200 to-amber-200",
      front: "from-white via-rose-50 to-pink-50 text-rose-500",
      glow: "bg-pink-200/40",
    },
    ghost: {
      edge: "from-rose-200/70 to-white",
      front: "from-white/65 via-white/55 to-rose-50/70 text-rose-500",
      glow: "bg-white/35",
    },
    gold: {
      edge: "from-amber-400 to-rose-400",
      front: "from-amber-200 via-pink-200 to-rose-300 text-rose-700",
      glow: "bg-amber-200/50",
    },
  };
  const style = variants[variant];

  return (
    <button
      type="button"
      className={`love-button group relative inline-grid min-h-12 place-items-center rounded-full text-sm font-black outline-none transition duration-200 active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      <span
        className={`absolute inset-x-0 bottom-0 h-full translate-y-1 rounded-full bg-gradient-to-r ${style.edge} opacity-80 transition group-active:translate-y-0`}
      />
      <span
        className={`absolute -inset-2 rounded-full ${style.glow} opacity-0 blur-xl transition duration-300 group-hover:opacity-100`}
      />
      <span
        className={`relative inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-gradient-to-r px-6 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_12px_26px_rgba(244,114,182,.25)] transition duration-200 group-active:translate-y-1 ${style.front}`}
      >
        <span className="button-shimmer" />
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </span>
    </button>
  );
}
