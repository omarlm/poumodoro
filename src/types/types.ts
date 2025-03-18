export type Phase = 'work' | 'break' | 'longBreak' | 'stopped' | 'paused';

export interface PomodoroState {
    phase: Phase;
    timeLeft: number;
    isRunning: boolean;
    workCount: number;
}