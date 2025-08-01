import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Player = {
  name: string;
};

type Team = {
  id: string;
  name: string;
  players: Player[];
};

type Set = {
  teamAScore: number;
  teamBScore: number;
};

type Match = {
  id: string;
  teams: [Team, Team];
  sets: Set[];
  startedAt?: Date;
  finishedAt?: Date;
};

type MatchActions = {
  startMatch: () => void;
  finishMatch: () => void;
  addNewSet: () => void;
  resetCurrentSet: () => void;
  getElapsedTime: () => number;
  incrementTeamAScore: () => void;
  incrementTeamBScore: () => void;
};

const useGameStore = create<Match & MatchActions>()(
  immer((set, get) => ({
    id: "1",
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
        teamAScore: 0,
        teamBScore: 0,
      },
    ],
    startMatch: () => {
      set((state) => {
        state.startedAt = new Date();
      });
    },
    finishMatch: () => {
      set((state) => {
        state.finishedAt = new Date();
      });
    },
    addNewSet: () => {
      set((state) => {
        state.sets.push({
          teamAScore: 0,
          teamBScore: 0,
        });
      });
    },
    resetCurrentSet: () => {
      set((state) => {
        state.sets[state.sets.length - 1] = {
          teamAScore: 0,
          teamBScore: 0,
        };
      });
    },
    getElapsedTime: () => {
      const state = get();
      if (!state.startedAt) return 0;
      if (state.finishedAt && state.startedAt) {
        return state.finishedAt.getTime() - state.startedAt.getTime();
      }

      return new Date().getTime() - state.startedAt.getTime();
    },
    incrementTeamAScore: () => {
      set((state) => {
        state.sets[state.sets.length - 1].teamAScore += 1;
      });
    },
    incrementTeamBScore: () => {
      set((state) => {
        state.sets[state.sets.length - 1].teamBScore += 1;
      });
    },
  }))
);

export default useGameStore;
