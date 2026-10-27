# Kitchen Count: mobile app

Inventory counting app for restaurant staff. Pick a storage area, count every product, save the count to the Kitchen Admin API (the `interview-server` repo). Saved counts show up on the web app's "Inventory counts" page.

**This README is the index.** It holds what every task needs. Open a linked file only when its trigger applies.

Getting it running: [`SETUP.md`](SETUP.md). Expo-specific agent guidance: [`AGENTS.md`](AGENTS.md).

## Working rules (humans and AI agents)
1. **Read before you change.** Trace the flow end-to-end (screen → store → service → API route on the server) before editing one layer.
2. **Discuss before building.** Restate the request, list the files you will change, and agree on it with the user before writing code. An ambiguous request gets a question, not a guess.
3. **Smallest diff.** Match the surrounding code. No drive-by refactors.
4. **Verify.** `npm run typecheck` and `npm test`, then try the change in the running app.

## Where to add X
- **A new screen:** [`playbooks/adding-a-screen.md`](playbooks/adding-a-screen.md)
- **A new API call:** add a function to `src/services/inventoryService.ts` using `apiFetch`; the route itself lives in the server repo (see its README).

## Repo map
| Path | Purpose |
|------|---------|
| `src/app/` | Expo Router screens. `_layout.tsx` = navigation stack |
| `src/app/index.tsx` | Storage areas list |
| `src/app/area/[id].tsx` | Count screen for one area + Save |
| `src/components/` | Reusable UI (`ProductCountRow`, `ErrorMessage`) |
| `src/stores/countDraftStore.ts` | Zustand: unsaved counts per area (in memory) |
| `src/services/` | API clients. `api.ts` = base URL + `apiFetch` |
| `src/utils/countPayload.ts` | Builds the save request body; parses count input |
| `src/types.ts` | API shapes (mirror of the server's types) |
| `src/constants/theme.ts` | Colors and spacing |

## Count flow
1. `index.tsx` loads areas: `GET /api/inventory/areas`.
2. `area/[id].tsx` loads products: `GET /api/inventory/areas/:areaId/products`.
3. Every change goes to `countDraftStore` (only touched products are in the draft).
4. **Save count** → `buildCountPayload` → `POST /api/inventory/counts` with `{ areaId, items: [{ productKey, count }] }` → draft cleared.

## Conventions
- Styling: `StyleSheet.create` at the bottom of the file, values from `constants/theme.ts`.
- Errors: log with `console.error`, show the user a message (`ErrorMessage` or `Alert`).
- Only pure logic goes in `src/utils/`, and it gets a `*.test.ts` next to it (Vitest).
