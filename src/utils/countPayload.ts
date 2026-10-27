import type { CountPayload } from '../types';

/** Counts per productKey for one area. Products the user never touched are absent. */
export type CountDraft = Record<string, number>;

/** Turns a draft into the POST /api/inventory/counts body. Only touched products are sent. */
export function buildCountPayload(areaId: number, draft: CountDraft): CountPayload {
  return {
    areaId,
    items: Object.entries(draft).map(([productKey, count]) => ({ productKey, count })),
  };
}

/** Parses user input into a count: non-negative, max 2 decimals, comma or dot as separator. */
export function parseCount(text: string): number | null {
  const value = Number(text.replace(',', '.'));
  if (text.trim() === '' || !Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100) / 100;
}
