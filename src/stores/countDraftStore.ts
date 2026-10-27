import { create } from 'zustand';
import type { CountDraft } from '../utils/countPayload';

interface CountDraftState {
  /** Unsaved counts per area id. Kept in memory only. */
  drafts: Record<number, CountDraft>;
  setCount: (areaId: number, productKey: string, count: number) => void;
  clearArea: (areaId: number) => void;
}

export const useCountDraftStore = create<CountDraftState>((set) => ({
  drafts: {},
  setCount: (areaId, productKey, count) =>
    set((state) => ({
      drafts: { ...state.drafts, [areaId]: { ...state.drafts[areaId], [productKey]: count } },
    })),
  clearArea: (areaId) =>
    set((state) => {
      const { [areaId]: _removed, ...rest } = state.drafts;
      return { drafts: rest };
    }),
}));
