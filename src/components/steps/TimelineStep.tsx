"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock3, ImagePlus, Sparkles } from "lucide-react";
import { useState } from "react";
import type { TimelineItem } from "@/data/loveStory";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LoveButton } from "@/components/ui/LoveButton";

export function TimelineStep({
  items,
  onNext,
}: {
  items: TimelineItem[];
  onNext: () => void;
}) {
  const [page, setPage] = useState(0);
  const item = items[page];
  const isLastPage = page === items.length - 1;

  return (
    <div className="flex flex-1 items-center py-2">
      <GlassPanel className="timeline-story-page">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-rose-500">
            <Clock3 size={19} />
            Memory chapter
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-black text-rose-400 shadow-sm">
            <Sparkles size={12} />
            {page + 1}/{items.length}
          </span>
        </div>

        <article className="timeline-feature-card rounded-[32px] bg-white/78 p-4 shadow-[0_20px_55px_rgba(244,114,182,.22)]">
          {item?.image ? (
            <div className="timeline-feature-image relative mb-4 aspect-[4/5] overflow-hidden rounded-[28px] bg-rose-50">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 480px) 92vw, 390px"
                className="scale-110 object-cover opacity-24 blur-xl"
              />
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 480px) 92vw, 390px"
                className="object-contain p-2"
              />
            </div>
          ) : (
            <div className="mb-4 grid aspect-[4/5] place-items-center rounded-[28px] bg-rose-50 text-rose-300">
              <ImagePlus size={44} />
            </div>
          )}

          <div className="rounded-[26px] border border-white/75 bg-white/65 p-4 text-center shadow-inner">
            <span className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-rose-300 to-pink-400 text-sm font-black text-white shadow-md">
              {page + 1}
            </span>
            <h3 className="text-balance text-xl font-black leading-7 text-rose-700">
              {item?.title}
            </h3>
            <p className="mt-2 text-pretty text-sm font-semibold leading-7 text-rose-800/70">
              {item?.text}
            </p>
          </div>
        </article>

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
            <LoveButton onClick={onNext}>ไปหน้าสุดท้าย</LoveButton>
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
