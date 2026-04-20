import { Redirect } from 'expo-router';

/**
 * Design-review build default entry is the tabs shell.
 * To walk onboarding flow from the top: open "/(onboarding)/welcome".
 * To test signup-ask modal: "/(onboarding)/signup-ask".
 */
export default function Entry() {
  return <Redirect href="/(onboarding)/welcome" />;
}
