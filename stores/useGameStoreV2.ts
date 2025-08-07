import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { ClockStateAndActions } from "./clockSlice";
import type { MatchStateAndActions } from "./matchSlice";

export type GameStoreV2 = ClockStateAndActions & MatchStateAndActions;

import { clockSlice } from "./clockSlice";
import { matchSlice } from "./matchSlice";

export const useGameStoreV2 = create<GameStoreV2>()(
  immer((...props) => ({
    ...clockSlice(...props),
    ...matchSlice(...props),
  }))
);
