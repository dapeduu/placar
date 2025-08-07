// Clock slice for zustand store

import { SliceCreator } from "@/types/SliceCreator";
import type { GameStoreV2 } from "./useGameStoreV2";

export type ClockState = {
  startedAt?: Date;
  finishedAt?: Date;
  pausedAt?: Date;
  totalPausedTime: number; // milliseconds
};

export type ClockActions = {
  resetClock: () => void;
  startClock: () => void;
  pauseClock: () => void;
  resumeClock: () => void;
  getElapsedTime: () => number;
};

export type ClockStateAndActions = ClockState & ClockActions;

export const clockSlice: SliceCreator<GameStoreV2, ClockStateAndActions> = (
  set,
  get
) => ({
  startedAt: undefined,
  finishedAt: undefined,
  pausedAt: undefined,
  totalPausedTime: 0,

  getElapsedTime: () => {
    const state = get();

    if (state.pausedAt && state.startedAt) {
      return (
        state.pausedAt.getTime() -
        state.startedAt.getTime() -
        state.totalPausedTime
      );
    }

    if (state.startedAt) {
      return Date.now() - state.startedAt.getTime() - state.totalPausedTime;
    }

    return 0;
  },

  resetClock: () => {
    set((state) => {
      state.startedAt = undefined;
      state.finishedAt = undefined;
      state.pausedAt = undefined;
      state.totalPausedTime = 0;
    });
  },
  startClock: () => {
    set((state) => {
      state.startedAt = new Date();
    });
  },
  pauseClock: () => {
    set((state) => {
      state.pausedAt = new Date();
    });
  },
  resumeClock: () => {
    set((state) => {
      if (state.pausedAt) {
        const pauseDuration = Date.now() - state.pausedAt.getTime();
        state.totalPausedTime += pauseDuration;
        state.pausedAt = undefined;
      }
    });
  },
});
