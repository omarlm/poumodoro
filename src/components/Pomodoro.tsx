import { useEffect } from "react";
import { setMuted } from "../utils/playSound";
import { usePomodoro } from "../hooks/usePomodoro";
import { useMuteSound } from "../context/MuteSoundContext";
import { AmbientSound, useAmbientSound } from "../hooks/useAmbientSound";
import TimerControls from "./ui/TimerControls";
import TimerDisplay from "./ui/TimerDisplay";
import Header from "./ui/Header";

import VolumeOnIcon from "../svg/VolumeOnIcon";
import VolumeOffIcon from "../svg/VolumeOffIcon";
import SoundSelect from "./ui/SoundSelect";

const Pomodoro = () => {
  const { isMuted, toggleMute } = useMuteSound();
  const { selectedSound, setSelectedSound, markUserInteraction } =
    useAmbientSound();

  useEffect(() => {
    setMuted(isMuted);
  }, [isMuted]);

  const {
    phase,
    timeLeft,
    isRunning,
    workCount,
    handlerStart,
    handlerPause,
    handlerReset,
  } = usePomodoro({ isMuted });

  const totalTime =
    phase === "work"
      ? 25 * 60
      : phase === "break"
        ? 5 * 60
        : phase === "longBreak"
          ? 15 * 60
          : 25 * 60;

  const handleStart = () => {
    markUserInteraction();
    handlerStart();
  };

  const handlePause = () => {
    markUserInteraction();
    handlerPause();
  };

  const handleReset = () => {
    markUserInteraction();
    handlerReset();
  };

  const handleSoundChange = (sound: AmbientSound) => {
    setSelectedSound(sound);
  };

  const handleToggleMute = () => {
    markUserInteraction();
    toggleMute();
  };

  return (
    <div className="min-h-screen items-end justify-center bg-white">
      <Header>
        <div className="ml-auto flex items-center space-x-4">
          <SoundSelect value={selectedSound} onChange={handleSoundChange} />
          <button
            onClick={handleToggleMute}
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeOffIcon className="h-6 w-6" />
            ) : (
              <VolumeOnIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </Header>

      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="rounded-lg p-8 text-center">
          <TimerDisplay
            phase={phase}
            timeLeft={timeLeft}
            totalTime={totalTime}
          />
          <TimerControls
            isRunning={isRunning}
            workCount={workCount}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
