import {
  useFonts as usePlusJakarta,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Fraunces_500Medium_Italic,
  Fraunces_700Bold_Italic,
} from '@expo-google-fonts/fraunces';
import {
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

export function useAppFonts(): boolean {
  const [loaded] = usePlusJakarta({
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    Fraunces_500Medium_Italic,
    Fraunces_700Bold_Italic,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  return loaded;
}
