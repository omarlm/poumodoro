let isMutedGlobal = false;

export const setMuted = (muted: boolean) => {
  isMutedGlobal = muted;
};

export const playSound = (soundPath: string) => {
  if (isMutedGlobal) return;

  const audio = new Audio(soundPath);
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
};
