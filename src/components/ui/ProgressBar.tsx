export function ProgressBar({
  value,
  current,
  total,
}: {
  value: number;
  current: number;
  total: number;
}) {
  return (
    <div className="fixed left-0 top-0 z-30 w-full px-4 pt-4">
      <div className="mx-auto max-w-md">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-rose-400">
          <span className="rounded-full bg-white/60 px-2.5 py-1 shadow-sm backdrop-blur">
            ของขวัญชั้นที่ {current}
          </span>
          <span>{current}/{total}</span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full border border-white/70 bg-white/70 shadow-inner backdrop-blur">
          <div
            className="progress-glow h-full rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-fuchsia-300 transition-all duration-700"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}
