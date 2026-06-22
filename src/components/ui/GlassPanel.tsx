import type { ReactNode } from "react";

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`luxury-panel relative w-full overflow-hidden rounded-[32px] border border-white/80 bg-white/72 p-6 shadow-[0_24px_80px_rgba(244,114,182,.26)] backdrop-blur-2xl ${className}`}
    >
      <div className="panel-shine pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-white/55 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-32 w-32 rounded-full bg-pink-200/45 blur-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
