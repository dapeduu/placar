import { SliceCreator } from "@/types/SliceCreator";
import type { GameStoreV2 } from "./useGameStoreV2";
import { teamHasWon } from "@/helpers/gameLogic";

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

export type MatchState = {
  id: string;
  teams: [Team, Team];
  sets: GameSet[];
  status: "idle" | "running" | "paused" | "finished";
  pointsToWin: number;
  differenceToWin: number;
};

export type MatchActions = {
  startMatch: () => void;
  finishMatch: () => void;
  addNewSet: () => void;
  removeLastSet: () => void;
  resetCurrentSet: () => void;
  undoLastEvent: () => void;
  incrementScore: (teamId: string) => void;
};

export type MatchStateAndActions = MatchState & MatchActions;

export const matchSlice: SliceCreator<GameStoreV2, MatchStateAndActions> = (
  set,
  get
) => ({
  id: "1",
  teams: [
    { id: "1", name: "Team A", players: [] },
    { id: "2", name: "Team B", players: [] },
  ],
  sets: [{ events: [] }],
  status: "idle",
  pointsToWin: 13,
  differenceToWin: 2,

  incrementScore: (teamId: string) => {
    set((state) => {
      const team = state.teams.find((team) => team.id === teamId);

      if (!team) {
        throw new Error(`Team with id ${teamId} not found`);
      }

      state.sets[state.sets.length - 1].events.push({ team });

      if (
        teamHasWon(teamId, state.sets[state.sets.length - 1], state.pointsToWin)
      ) {
        console.log("Team with id", teamId, "has won");
        get().addNewSet();
      }
    });
  },

  startMatch: () => {
    set((state) => {
      state.status = "running";
    });
  },
  finishMatch: () => {
    set((state) => {
      state.status = "finished";
    });
  },
  addNewSet: () => {
    console.log("Adding new set");
    set((state) => {
      state.sets.push({ events: [] });
    });
  },
  removeLastSet: () => {
    set((state) => {
      state.sets.pop();
    });
  },
  resetCurrentSet: () => {
    set((state) => {
      state.sets[state.sets.length - 1] = { events: [] };
    });
  },
  undoLastEvent: () => {
    set((state) => {
      const lastSet = state.sets[state.sets.length - 1];

      if (lastSet) {
        lastSet.events.pop();
      }
    });
  },
});
