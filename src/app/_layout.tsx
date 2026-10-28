import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          // Opaque header: without this, iOS draws a transparent header over the screen content.
          headerTransparent: false,
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.accent,
          headerTitleStyle: { color: colors.text },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Inventory' }} />
        <Stack.Screen name="area/[id]" options={{ title: 'Count' }} />
      </Stack>
    </>
  );
}
