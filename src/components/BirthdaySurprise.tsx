"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Gift, Sparkles } from "lucide-react";
import type { LoveStory } from "@/data/loveStory";
import { AnniversaryStep } from "@/components/steps/AnniversaryStep";
import { AcceptedCelebrationStep } from "@/components/steps/AcceptedCelebrationStep";
import { BirthdayCardStep } from "@/components/steps/BirthdayCardStep";
import { FinaleStep } from "@/components/steps/FinaleStep";
import { GalleryStep } from "@/components/steps/GalleryStep";
import { NoteStep } from "@/components/steps/NoteStep";
import { PreQuestionStep } from "@/components/steps/PreQuestionStep";
import { ProposalStep } from "@/components/steps/ProposalStep";
import { TimelineStep } from "@/components/steps/TimelineStep";
import { WelcomeStep } from "@/components/steps/WelcomeStep";
import { FloatingDecorations } from "@/components/ui/FloatingDecorations";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { ProgressBar } from "@/components/ui/ProgressBar";

type Story = LoveStory;

const STORAGE_KEY = "birthday-surprise-step-v3";

const steps = [
  "welcome",
  "card",
  "note",
  "gallery",
  "before-question",
  "proposal",
  "accepted-celebration",
  "anniversary",
  "timeline",
  "finale",
] as const;

type StepKey = (typeof steps)[number];

const pageVariants = {
  initial: { opacity: 0, y: 34, scale: 0.96, rotateX: 7, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -22, scale: 0.97, rotateX: -5, filter: "blur(8px)" },
};

export function BirthdaySurprise({ story }: { story: Story }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? Number(saved) : 0;
      if (Number.isInteger(parsed) && parsed >= 0 && parsed < steps.length) {
        setStepIndex(parsed);
      }
      setHasLoaded(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      window.localStorage.setItem(STORAGE_KEY, String(stepIndex));
    }
  }, [hasLoaded, stepIndex]);

  const currentStep: StepKey = steps[stepIndex];
  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / steps.length) * 100),
    [stepIndex],
  );

  const goNext = () => setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  const goBack = () => setStepIndex((current) => Math.max(current - 1, 0));
  const replay = () => setStepIndex(0);

  return (
    <main className="romantic-stage relative min-h-dvh overflow-hidden text-rose-950">
      <FloatingDecorations
        intense={
          currentStep === "finale" ||
          currentStep === "proposal" ||
          currentStep === "accepted-celebration"
        }
      />
      <ProgressBar value={progress} current={stepIndex + 1} total={steps.length} />
      <MusicToggle music={story.music} />

      <section className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-9 pt-24 [perspective:1200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1"
          >
            {currentStep === "welcome" && (
              <WelcomeStep welcome={story.welcome} onNext={goNext} />
            )}
            {currentStep === "card" && (
              <BirthdayCardStep lines={story.birthdayCard} onNext={goNext} />
            )}
            {currentStep === "note" && <NoteStep notes={story.notes} onNext={goNext} />}
            {currentStep === "gallery" && (
              <GalleryStep memories={story.memories} onNext={goNext} />
            )}
            {currentStep === "before-question" && (
              <PreQuestionStep lines={story.beforeQuestion} onNext={goNext} />
            )}
            {currentStep === "proposal" && <ProposalStep onAccepted={goNext} />}
            {currentStep === "accepted-celebration" && (
              <AcceptedCelebrationStep onNext={goNext} />
            )}
            {currentStep === "anniversary" && (
              <AnniversaryStep
                correctDay={story.correctAnniversaryDay}
                hints={story.anniversaryHints}
                onNext={goNext}
              />
            )}
            {currentStep === "timeline" && (
              <TimelineStep items={story.timeline} onNext={goNext} />
            )}
            {currentStep === "finale" && <FinaleStep finale={story.finale} onReplay={replay} />}
          </motion.div>
        </AnimatePresence>

        {stepIndex > 0 && currentStep !== "finale" && (
          <button
            type="button"
            onClick={goBack}
            className="mt-5 inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-bold text-rose-500 shadow-[0_10px_30px_rgba(244,114,182,.18)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
          >
            <ArrowLeft size={16} />
            ย้อนกลับ
          </button>
        )}
      </section>

      <div className="pointer-events-none fixed bottom-4 left-1/2 z-0 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/60 bg-white/45 px-4 py-2 text-xs font-black text-rose-400 shadow-lg shadow-rose-100/60 backdrop-blur">
        <Sparkles size={14} />
        <Gift size={14} />
        เปิดของขวัญทีละชั้น
        <ArrowRight size={14} />
      </div>
    </main>
  );
}
