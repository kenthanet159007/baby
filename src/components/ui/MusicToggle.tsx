"use client";

import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MusicToggle({
  music,
}: {
  music: { src: string; labelOn: string; labelOff: string };
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopGeneratedMusic = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    void audioContextRef.current?.close();
    audioContextRef.current = null;
  };

  const playSoftChime = () => {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    audioContextRef.current = context;
    const notes = [523.25, 659.25, 783.99, 659.25];
    let index = 0;

    const playNote = () => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = notes[index % notes.length];
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, context.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.9);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 1);
      index += 1;
    };

    playNote();
    intervalRef.current = window.setInterval(playNote, 1200);
  };

  const toggleMusic = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      stopGeneratedMusic();
      setIsPlaying(false);
      return;
    }

    try {
      if (music.src) {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.35;
        await audio.play();
      } else {
        playSoftChime();
      }
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      void audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed right-4 top-14 z-40">
      {music.src && <audio ref={audioRef} src={music.src} loop preload="none" />}
      <button
        type="button"
        onClick={toggleMusic}
        className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-2 text-xs font-bold text-rose-500 shadow-sm backdrop-blur transition active:scale-95"
        aria-pressed={isPlaying}
      >
        {isPlaying ? <VolumeX size={15} /> : <Music size={15} />}
        {isPlaying ? music.labelOn : music.labelOff}
      </button>
    </div>
  );
}
