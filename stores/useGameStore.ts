import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Player = {
  name: string;
};

export type Team = {
  id: string;
  name: string;
  players: Player[];
};

export type GameSet = {
  events: ScoreEvent[];
};

export type ScoreEvent = {
  team: Team;
};

export type Match = {
  id: string;
  teams: [Team, Team];
  sets: GameSet[];
  status: "idle" | "running" | "paused" | "finished";
  startedAt?: Date;
  finishedAt?: Date;
  pausedAt?: Date;
  totalPausedTime: number; // milliseconds
};

export type MatchActions = {
  startMatch: () => void;
  finishMatch: () => void;
  addNewSet: () => void;
  resetCurrentSet: () => void;
  getElapsedTime: () => number;
  getCurrentStreak: () => {
    teamId: string | null;
    streak: number;
  };
  incrementTeamAScore: () => void;
  incrementTeamBScore: () => void;
  undoLastEvent: () => void;
  pauseMatch: () => void;
  resumeMatch: () => void;
  resetMatch: () => void;
};

const useGameStore = create<Match & MatchActions>()(
  immer((set, get) => ({
    id: "1",
    status: "idle",
    teams: [
      {
        id: "1",
        name: "Team A",
        players: [],
      },
      {
        id: "2",
        name: "Team B",
        players: [],
      },
    ],
    sets: [
      {
        events: [],
      },
    ],
    pausedAt: undefined,
    totalPausedTime: 0,

    addNewSet: () => {
      set((state) => {
        state.sets.push({
          events: [],
        });
      });
    },
    resetCurrentSet: () => {
      set((state) => {
        state.sets[state.sets.length - 1] = {
          events: [],
        };
      });
    },
    getElapsedTime: () => {
      const state = get();
      if (!state.startedAt) return 0;

      let endTime: number;
      if (state.finishedAt) {
        endTime = state.finishedAt.getTime();
      } else if (state.status === "paused" && state.pausedAt) {
        endTime = state.pausedAt.getTime();
      } else {
        endTime = new Date().getTime();
      }

      const totalElapsed = endTime - state.startedAt.getTime();
      return Math.max(0, totalElapsed - state.totalPausedTime);
    },
    incrementTeamAScore: () => {
      set((state) => {
        state.sets[state.sets.length - 1].events.push({
          team: state.teams[0],
        });
      });
    },
    incrementTeamBScore: () => {
      set((state) => {
        state.sets[state.sets.length - 1].events.push({
          team: state.teams[1],
        });
      });
    },
    undoLastEvent: () => {
      set((state) => {
        state.sets[state.sets.length - 1].events.pop();
      });
    },
    getCurrentStreak: () => {
      const state = get();
      const currentSet = state.sets[state.sets.length - 1];

      if (currentSet.events.length === 0) {
        return { teamId: null, streak: 0 };
      }

      let streak = 1;
      let lastTeamToScoreId =
        currentSet.events[currentSet.events.length - 1].team.id;

      for (let i = currentSet.events.length - 2; i >= 0; i--) {
        const currentEvent = currentSet.events[i];
        if (currentEvent.team.id === lastTeamToScoreId) {
          streak++;
        } else {
          break;
        }
      }

      return { teamId: lastTeamToScoreId, streak };
    },
    startMatch: () => {
      set((state) => {
        state.status = "running";
        state.startedAt = new Date();
      });
    },
    finishMatch: () => {
      set((state) => {
        state.status = "finished";
        state.finishedAt = new Date();
      });
    },
    resetMatch: () => {
      set((state) => {
        state.status = "idle";
        state.startedAt = undefined;
        state.finishedAt = undefined;
        state.pausedAt = undefined;
        state.totalPausedTime = 0;
        state.sets = [];
      });
    },
    pauseMatch: () => {
      set((state) => {
        if (state.status === "running") {
          state.status = "paused";
          state.pausedAt = new Date();
        }
      });
    },
    resumeMatch: () => {
      set((state) => {
        if (state.status === "paused" && state.pausedAt) {
          const pauseDuration = new Date().getTime() - state.pausedAt.getTime();
          state.totalPausedTime += pauseDuration;
          state.status = "running";
          state.pausedAt = undefined;
        }
      });
    },
  }))
);

export default useGameStore;
