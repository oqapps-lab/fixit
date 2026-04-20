import { Redirect } from 'expo-router';

export default function Entry() {
  // In a real build we'd read AsyncStorage/Supabase session state.
  // For a design-review build the default experience starts at Welcome.
  return <Redirect href="/(onboarding)/welcome" />;
}
