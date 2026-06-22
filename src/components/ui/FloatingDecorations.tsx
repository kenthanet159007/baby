const hearts = ["♡", "♥", "✦", "✨", "❀", "♡", "✧", "✺", "✦", "♡", "✧"];

export function FloatingDecorations({ intense = false }: { intense?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart, index) => (
        <span
          key={`${heart}-${index}`}
          className={`floating-heart absolute text-pink-300/75 drop-shadow-sm ${
            intense ? "text-2xl" : "text-xl"
          }`}
          style={{
            left: `${5 + ((index * 17) % 86)}%`,
            top: `${9 + ((index * 23) % 72)}%`,
            animationDelay: `${index * 0.7}s`,
            animationDuration: `${6 + index * 0.6}s`,
          }}
        >
          {heart}
        </span>
      ))}
      {Array.from({ length: intense ? 22 : 14 }).map((_, index) => (
        <i
          key={index}
          className="magic-dust absolute rounded-full bg-white"
          style={{
            left: `${3 + ((index * 19) % 92)}%`,
            top: `${8 + ((index * 29) % 78)}%`,
            animationDelay: `${index * 0.35}s`,
            animationDuration: `${3.5 + (index % 5)}s`,
          }}
        />
      ))}
      <div className="aurora-blob absolute -left-24 top-20 h-56 w-56 rounded-full bg-pink-200/45 blur-3xl" />
      <div className="aurora-blob absolute -right-20 bottom-16 h-64 w-64 rounded-full bg-amber-100/70 blur-3xl [animation-delay:1.2s]" />
      <div className="aurora-blob absolute left-1/3 top-1/2 h-52 w-52 rounded-full bg-fuchsia-100/40 blur-3xl [animation-delay:2s]" />
    </div>
  );
}
