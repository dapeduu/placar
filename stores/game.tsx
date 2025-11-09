import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Player = {
  id: string;
  name: string;
  createdAt: number;
};

export type Team = {
  id: string;
  name: string;
  emoji: string;
  playerIds: string[];
  createdAt: number;
};

export type GameEvent =
  | {
      type: "match_started";
      teamIds: [string, string];
      pointsToWin: number;
      timestamp: number;
    }
  | { type: "point_scored"; teamId: string; timestamp: number }
  | {
      type: "set_completed";
      winnerId: string;
      pointsWon: [number, number];
      timestamp: number;
    }
  | { type: "match_paused"; timestamp: number }
  | { type: "match_resumed"; timestamp: number }
  | { type: "match_ended"; timestamp: number };

export type Match = {
  id: string;
  teamIds: [string, string];
  pointsToWin: number;
  createdAt: number;
  events: GameEvent[];
};

export type MatchSummary = {
  id: string;
  teamIds: [string, string];
  winnerId?: string;
  setsWon: [number, number];
  pointsWon: [number, number];
  startedAt: number;
  endedAt: number;
};

export type GameStoreState = {
  players: Record<string, Player>;
  teams: Record<string, Team>;
  currentMatchId?: string;
  matches: Record<string, Match>;
  matchSummaries: Record<string, MatchSummary>;
};

export type GameStoreActions = {
  createTeam: (name: string, emoji: string) => string;
  updateTeam: (id: string, data: Partial<Pick<Team, "name" | "emoji">>) => void;
  deleteTeam: (id: string) => void;

  createPlayer: (name: string) => string;
  updatePlayer: (id: string, name: string) => void;
  deletePlayer: (id: string) => void;

  addPlayerToTeam: (playerId: string, teamId: string) => void;
  removePlayerFromTeam: (playerId: string, teamId: string) => void;

  startMatch: (team1Id: string, team2Id: string, pointsToWin?: number) => void;
  addPoint: (teamId: string) => void;
  undoLastEvent: () => void;
  pauseMatch: () => void;
  resumeMatch: () => void;
  endMatch: () => void;

  deleteMatch: (matchId: string) => void;
  clearMatchHistory: () => void;
};

export type GameStore = GameStoreState & GameStoreActions;

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      immer((set) => ({
        players: {},
        teams: {},
        currentMatchId: undefined,
        matches: {},
        matchSummaries: {},
        createTeam: (name, emoji) => {
          const id = crypto.randomUUID() as string;
          set((state) => {
            state.teams[id] = {
              id,
              name,
              emoji,
              playerIds: [],
              createdAt: Date.now(),
            };
          });
          return id;
        },
        updateTeam: (id, data) => {
          set((state) => {
            state.teams[id] = { ...state.teams[id], ...data };
          });
        },
        deleteTeam: (id) => {
          set((state) => {
            delete state.teams[id];
          });
        },
        createPlayer: (name) => {
          const id = crypto.randomUUID() as string;
          set((state) => {
            state.players[id] = { id, name, createdAt: Date.now() };
          });
          return id;
        },
        updatePlayer: (id, name) => {
          set((state) => {
            state.players[id] = { ...state.players[id], name };
          });
        },
        deletePlayer: (id) => {
          set((state) => {
            delete state.players[id];
          });
        },
        addPlayerToTeam: (playerId, teamId) => {
          set((state) => {
            state.teams[teamId].playerIds.push(playerId);
          });
        },
        removePlayerFromTeam: (playerId, teamId) => {
          set((state) => {
            state.teams[teamId].playerIds = state.teams[
              teamId
            ].playerIds.filter((id) => id !== playerId);
          });
        },
        startMatch: (team1Id, team2Id, pointsToWin = 21) => {
          const id = crypto.randomUUID() as string;

          set((state) => {
            state.currentMatchId = id;
            state.matches[id] = {
              id,
              teamIds: [team1Id, team2Id],
              pointsToWin,
              createdAt: Date.now(),
              events: [],
            };
          });
        },
        addPoint: (teamId) => {
          set((state) => {
            if (!state.currentMatchId) {
              throw new Error("No match in progress");
            }

            state.matches[state.currentMatchId].events.push({
              type: "point_scored",
              teamId,
              timestamp: Date.now(),
            });
          });
        },
        undoLastEvent: () => {
          set((state) => {
            if (!state.currentMatchId) {
              throw new Error("No match in progress");
            }

            state.matches[state.currentMatchId].events.pop();
          });
        },
        deleteMatch: (matchId) => {
          set((state) => {
            delete state.matches[matchId];
          });
        },
        clearMatchHistory: () => {
          set((state) => {
            state.matchSummaries = {};
          });
        },
        pauseMatch: () => {
          set((state) => {
            if (!state.currentMatchId) {
              throw new Error("No match in progress");
            }

            state.matches[state.currentMatchId].events.push({
              type: "match_paused",
              timestamp: Date.now(),
            });
          });
        },
        resumeMatch: () => {
          set((state) => {
            if (!state.currentMatchId) {
              throw new Error("No match in progress");
            }
            state.matches[state.currentMatchId].events.push({
              type: "match_resumed",
              timestamp: Date.now(),
            });
          });
        },
        endMatch: () => {
          set((state) => {
            if (!state.currentMatchId) {
              throw new Error("No match in progress");
            }

            const match = state.matches[state.currentMatchId];

            state.currentMatchId = undefined;

            // The winner is the team that has won the most sets
            let setsWonByTeam: Record<string, number> = Object.fromEntries(
              match.teamIds.map((id) => [id, 0])
            );

            for (const event of match.events) {
              if (event.type === "set_completed") {
                setsWonByTeam[event.winnerId]++;
              }
            }

            const winnerId = Object.keys(setsWonByTeam).reduce((a, b) =>
              setsWonByTeam[a] > setsWonByTeam[b] ? a : b
            );

            state.matchSummaries[match.id] = {
              id: match.id,
              teamIds: match.teamIds,
              winnerId,
              setsWon: [
                setsWonByTeam[match.teamIds[0]],
                setsWonByTeam[match.teamIds[1]],
              ],
              pointsWon: [
                match.events.filter(
                  (event) =>
                    event.type === "point_scored" &&
                    event.teamId === match.teamIds[0]
                ).length,
                match.events.filter(
                  (event) =>
                    event.type === "point_scored" &&
                    event.teamId === match.teamIds[1]
                ).length,
              ],
              startedAt: match.createdAt,
              endedAt: Date.now(),
            };
          });
        },
      })),
      { name: "game-store" }
    )
  )
);
