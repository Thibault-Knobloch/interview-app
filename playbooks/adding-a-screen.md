# Adding a Screen
Expo Router: every file in `src/app/` is a screen.

## Flow
1. **Route file.** Add `src/app/<name>.tsx` (or `src/app/<folder>/[param].tsx` for a dynamic route). Default-export the screen component.
2. **Register options.** Add a `<Stack.Screen name="..." options={{ title: '...' }} />` in `src/app/_layout.tsx`.
3. **Data.** Add API calls to `src/services/` using `apiFetch`. Shared or cross-screen state goes in a Zustand store in `src/stores/`; screen-only state stays in `useState`.
4. **Navigate.** `router.push('/<path>')` from `expo-router`; read params with `useLocalSearchParams`.
5. **Verify.** `npm run typecheck`, `npm test`, then open the screen in the running app.

## Patterns
- **Loading / error:** `isLoading` → `ActivityIndicator`; error → `<ErrorMessage message onRetry />`. See `src/app/index.tsx`.
- **Styling:** `StyleSheet.create` at the bottom of the file, values from `constants/theme.ts`.
- **Logic:** keep pure functions in `src/utils/` with a test next to them.

## Reference examples
- **List + navigation:** `src/app/index.tsx`
- **Dynamic route + save:** `src/app/area/[id].tsx`
