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
  startedAt?: Date;
  finishedAt?: Date;
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
        events: [],
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
      if (state.finishedAt && state.startedAt) {
        return state.finishedAt.getTime() - state.startedAt.getTime();
      }

      return new Date().getTime() - state.startedAt.getTime();
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
  }))
);

export default useGameStore;
