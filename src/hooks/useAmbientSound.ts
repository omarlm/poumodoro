import { useState, useEffect, useRef } from "react";
import { useMuteSound } from "../context/MuteSoundContext";
import { soundURLs } from "../constants/soundURLs";

export type AmbientSound =
  | "rain"
  | "ocean"
  | "fireplace"
  | "coffee"
  | "nature"
  | "none";

export const useAmbientSound = () => {
  const { isMuted } = useMuteSound();
  const [selectedSound, setSelectedSound] = useState<AmbientSound>(() => {
    const savedSound = localStorage.getItem("ambientSound");
    return (savedSound as AmbientSound) || "none";
  });
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem("ambientSound", selectedSound);
  }, [selectedSound]);

  const markUserInteraction = () => {
    setUserInteracted(true);
  };

  const changeSound = (newSound: AmbientSound) => {
    markUserInteraction();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setSelectedSound(newSound);

    if (newSound !== "none") {
      const newAudio = new Audio(soundURLs[newSound]);
      newAudio.loop = true;
      audioRef.current = newAudio;

      if (!isMuted) {
        try {
          newAudio.play().catch((err) => {
            console.error("Error playing:", err);
          });
        } catch (err) {
          console.error("Error trying to play:", err);
        }
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else if (selectedSound !== "none" && userInteracted) {
        audioRef.current.play().catch((err) => {
          console.error("Error playing after unmute:", err);
        });
      }
    }
  }, [isMuted, selectedSound, userInteracted]);

  return {
    selectedSound,
    setSelectedSound: changeSound,
    markUserInteraction,
    userInteracted,
  };
};
