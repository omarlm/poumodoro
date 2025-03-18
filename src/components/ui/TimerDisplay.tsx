import React from "react";
import CircularProgress from "./CircularProgress";
import { formatTime } from "../../utils/utils";
import { Phase } from "../../types/types";

interface TimerDisplayProps {
  phase: Phase;
  timeLeft: number;
  totalTime: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  phase,
  timeLeft,
  totalTime,
}) => {
  const phaseText = {
    work: "Work",
    break: "Short Break",
    longBreak: "Long Break",
    paused: "Paused",
    stopped: "Stopped",
  }[phase];

  const displayValue = phase === "stopped" ? 25 * 60 : timeLeft;

  return (
    <div className="flex flex-col items-center space-y-4">
      <CircularProgress
        key={`${phase}-${displayValue}`}
        value={displayValue}
        maxValue={totalTime}
        size={250}
        strokeWidth={12}
        strokeColor="#8ebdb6"
        backgroundColor="#e0e0e0"
      >
        <div className="font-sans text-5xl font-bold text-gray-800">
          {formatTime(displayValue)}
        </div>
      </CircularProgress>
      <div className="font-sans text-2xl font-semibold text-gray-600">
        {phaseText}
      </div>
    </div>
  );
};

export default TimerDisplay;
