"use client";

import { Cake, Heart, PenLine, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";

export function NoteStep({ notes, onNext }: { notes: string[]; onNext: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= notes.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 850);

    return () => window.clearInterval(timer);
  }, [notes.length]);

  return (
    <div className="flex flex-1 items-center">
      <GlassPanel className="birthday-note-scene">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-black text-rose-400">
            <PenLine size={18} />
            Birthday wish note
          </div>
          <Sparkles size={18} className="text-amber-400" />
        </div>
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-black text-rose-400 shadow-sm">
          <Cake size={13} />
          this part is still her birthday moment
        </div>
        <div className="notebook-paper birthday-paper relative min-h-80 rounded-[30px] border border-rose-100 bg-[#fffaf1] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_16px_40px_rgba(180,83,9,.12)]">
          <div className="paper-tape left-8 -top-3 rotate-[-5deg]" />
          <div className="paper-tape right-8 -top-3 rotate-[5deg]" />
          <div className="absolute right-5 top-5 text-rose-300">
            <Heart size={18} fill="currentColor" />
          </div>
          <div className="space-y-4 pt-2 font-semibold leading-8 text-rose-900/80">
            {notes.slice(0, visibleCount).map((note) => (
              <p key={note} className="typing-line">
                {note}
              </p>
            ))}
            {visibleCount < notes.length && (
              <span className="inline-block h-5 w-2 animate-pulse rounded-sm bg-rose-300" />
            )}
          </div>
        </div>
        <LoveButton
          onClick={onNext}
          disabled={visibleCount < notes.length}
          className="mt-7 w-full"
        >
          อ่านต่อ
        </LoveButton>
      </GlassPanel>
    </div>
  );
}
