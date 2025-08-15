// mobile/app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ title: 'Sparkr' }} />
        <Stack.Screen name="chat" options={{ title: 'Messages' }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}