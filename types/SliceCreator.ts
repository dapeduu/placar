import { StateCreator } from "zustand";

// For flat composition pattern - slices that will be spread together
export type SliceCreator<TState, TSlice> = StateCreator<
  TState,
  [["zustand/immer", never], never],
  [],
  TSlice
>;
