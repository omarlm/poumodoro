import ResetIcon from "../../svg/ResetIcon";

interface TimerControlsProps {
  isRunning: boolean;
  workCount: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="flex justify-center gap-6 pt-6">
      <button
        onClick={isRunning ? onPause : onStart}
        className="w-32 cursor-pointer rounded-full bg-[#8ebdb6] px-6 py-3 text-center font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#6a9c95]"
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        onClick={onReset}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#e0e0e0] text-gray-800 transition-all duration-300 ease-in-out hover:bg-[#cccccc]"
      >
        <ResetIcon />
      </button>
    </div>
  );
};

export default TimerControls;
