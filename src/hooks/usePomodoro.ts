import { useEffect, useState } from "react";
import { PomodoroState, Phase } from "../types/types";
import { playSound } from "../utils/playSound";

const WORK_TIME = 1500;
const SHORT_BREAK_TIME = 300;
const LONG_BREAK_TIME = 600;

const loadState = (): PomodoroState | null => {
  const savedState = localStorage.getItem("pomodoroState");
  return savedState ? JSON.parse(savedState) : null;
};

const saveState = (state: PomodoroState) => {
  localStorage.setItem("pomodoroState", JSON.stringify(state));
};

export function usePomodoro({ isMuted = false }: { isMuted: boolean }) {
  const [state, setState] = useState<PomodoroState>(() => {
    const savedState = loadState();
    return (
      savedState || {
        phase: "stopped",
        timeLeft: WORK_TIME,
        isRunning: false,
        workCount: 0,
      }
    );
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const handlerStart = () => {
    setState({
      phase: "work",
      timeLeft: state.timeLeft,
      isRunning: true,
      workCount: state.workCount,
    });
    if (!isMuted) {
      playSound("/sounds/start-sound.mp3");
    }
  };

  const handlerPause = () => {
    setState((prevState) => ({
      ...prevState,
      phase: "paused",
      isRunning: false,
    }));
  };

  const handlerReset = () => {
    setState({
      phase: "stopped",
      timeLeft: WORK_TIME,
      isRunning: false,
      workCount: 0,
    });
  };

  useEffect(() => {
    if (!state.isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setState((prevState) => {
        if (prevState.timeLeft <= 1) {
          if (!isMuted) {
            playSound("/sounds/break-sound.mp3");
            if (prevState.phase === "longBreak") {
              playSound("/sounds/end-sound.mp3");
            }
          }
          const transition = transitions[prevState.phase];

          if (transition) {
            const next = transition(prevState.workCount);
            return {
              ...prevState,
              ...next,
              isRunning: true,
            };
          } else {
            return {
              ...prevState,
              isRunning: false,
            };
          }
        } else {
          return {
            ...prevState,
            timeLeft: prevState.timeLeft - 1,
          };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, isMuted]);

  return {
    phase: state.phase,
    timeLeft: state.timeLeft,
    isRunning: state.isRunning,
    workCount: state.workCount,
    handlerStart,
    handlerPause,
    handlerReset,
  };
}

export const transitions = {
  work: (currentWorkCount: number) => {
    const newWorkCount = currentWorkCount + 1;
    if (newWorkCount < 4) {
      return {
        phase: "break" as Phase,
        timeLeft: SHORT_BREAK_TIME,
        workCount: newWorkCount,
      };
    } else {
      return {
        phase: "longBreak" as Phase,
        timeLeft: LONG_BREAK_TIME,
        workCount: 0,
      };
    }
  },
  break: (currentWorkCount: number) => {
    return {
      phase: "work" as Phase,
      timeLeft: WORK_TIME,
      workCount: currentWorkCount,
    };
  },
  longBreak: () => {
    return { phase: "work" as Phase, timeLeft: WORK_TIME, workCount: 0 };
  },
  stopped: () => ({
    phase: "stopped" as Phase,
    timeLeft: WORK_TIME,
    isRunning: false,
    workCount: 0,
  }),
  paused: (currentWorkCount: number) => ({
    phase: "paused" as Phase,
    timeLeft: WORK_TIME,
    isRunning: false,
    workCount: currentWorkCount,
  }),
};
