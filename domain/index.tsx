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
