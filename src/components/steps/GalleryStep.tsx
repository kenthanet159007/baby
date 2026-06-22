"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Images, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { Memory } from "@/data/loveStory";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";

function chunkMemories(memories: Memory[]) {
  const pages: Memory[][] = [];
  for (let index = 0; index < memories.length; index += 2) {
    pages.push(memories.slice(index, index + 2));
  }
  return pages;
}

export function GalleryStep({
  memories,
  onNext,
}: {
  memories: Memory[];
  onNext: () => void;
}) {
  const [page, setPage] = useState(0);
  const pages = useMemo(() => chunkMemories(memories), [memories]);
  const currentPage = pages[page] ?? [];
  const isLastPage = page === pages.length - 1;

  return (
    <div className="flex flex-1 items-center">
      <GlassPanel>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-rose-500">
            <Images size={18} />
            Gallery ความทรงจำ
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-black text-rose-400 shadow-sm">
            <Sparkles size={12} />
            {page + 1}/{pages.length}
          </span>
        </div>

        <div className="grid gap-5">
          {currentPage.map((memory, index) => (
            <figure
              key={memory.image}
              className={`polaroid-card memory-adaptive-card overflow-hidden rounded-[26px] bg-white p-3 shadow-[0_18px_45px_rgba(244,114,182,.22)] ${
                index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"
              }`}
            >
              <div className="memory-photo-frame relative aspect-[4/3] overflow-hidden rounded-2xl bg-rose-50">
                <Image
                  src={memory.image}
                  alt=""
                  fill
                  sizes="(max-width: 480px) 90vw, 380px"
                  className="scale-110 object-cover opacity-28 blur-xl"
                />
                <Image
                  src={memory.image}
                  alt={memory.alt}
                  fill
                  sizes="(max-width: 480px) 90vw, 380px"
                  className="object-contain p-1"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-pink-200/25" />
                <div className="absolute right-3 top-3 rounded-full bg-white/75 p-2 text-rose-400 backdrop-blur">
                  <Heart size={14} fill="currentColor" />
                </div>
              </div>
              <figcaption className="px-1 pt-3 text-center text-sm leading-6 text-rose-800/75">
                {memory.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <LoveButton
            variant="ghost"
            disabled={page === 0}
            onClick={() => setPage((current) => Math.max(current - 1, 0))}
          >
            <ChevronLeft size={17} />
            Back
          </LoveButton>
          {isLastPage ? (
            <LoveButton onClick={onNext}>มีอะไรจะบอก…</LoveButton>
          ) : (
            <LoveButton onClick={() => setPage((current) => current + 1)}>
              Next
              <ChevronRight size={17} />
            </LoveButton>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
