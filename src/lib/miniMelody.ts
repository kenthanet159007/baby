"use client";

type MelodyOptions = {
  volume?: number;
  wave?: OscillatorType;
  tempo?: number;
};

const melodyNotes = [523.25, 659.25, 783.99, 1046.5, 987.77, 783.99, 659.25, 783.99];

export function playMiniMelody({
  volume = 0.08,
  wave = "triangle",
  tempo = 0.13,
}: MelodyOptions = {}) {
  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();

  melodyNotes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + index * tempo;

    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.46);
  });

  window.setTimeout(() => void context.close(), melodyNotes.length * tempo * 1000 + 700);
}
