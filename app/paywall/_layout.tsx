import { Stack } from 'expo-router';
import { colors } from '@/constants/tokens';

// transparentModal preserves the custom bottom-sheet design (scrim +
// grabber + dismiss-by-backdrop). Deep-link navigation BETWEEN paywall
// screens stacks visually (rare in real flows — users dismiss via CTA).
// Switching to pageSheet would require redesigning all paywall screens.
export default function PaywallLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
        animation: 'fade',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="success"
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="manage"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.bg },
        }}
      />
      <Stack.Screen name="alerts" />
      <Stack.Screen name="save" />
      <Stack.Screen name="warranty" />
      <Stack.Screen name="pdf" />
    </Stack>
  );
}
