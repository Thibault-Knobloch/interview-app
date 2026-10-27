import { describe, expect, it } from 'vitest';
import { buildCountPayload, parseCount } from './countPayload';

describe('buildCountPayload', () => {
  it('sends only the products in the draft', () => {
    expect(buildCountPayload(3, { tonic: 24, lemons: 0 })).toEqual({
      areaId: 3,
      items: [
        { productKey: 'tonic', count: 24 },
        { productKey: 'lemons', count: 0 },
      ],
    });
  });

  it('sends an empty items array for an empty draft', () => {
    expect(buildCountPayload(1, {})).toEqual({ areaId: 1, items: [] });
  });
});

describe('parseCount', () => {
  it('accepts dot and comma decimals', () => {
    expect(parseCount('2.5')).toBe(2.5);
    expect(parseCount('2,5')).toBe(2.5);
  });

  it('rejects empty, negative and non-numeric input', () => {
    expect(parseCount('')).toBeNull();
    expect(parseCount('-1')).toBeNull();
    expect(parseCount('abc')).toBeNull();
  });
});
