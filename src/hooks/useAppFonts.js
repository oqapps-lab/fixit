import { useFonts as useArchivo, Archivo_600SemiBold, Archivo_700Bold, Archivo_800ExtraBold, } from '@expo-google-fonts/archivo';
import { ArchivoNarrow_500Medium, ArchivoNarrow_700Bold, } from '@expo-google-fonts/archivo-narrow';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, } from '@expo-google-fonts/inter';
import { JetBrainsMono_400Regular, JetBrainsMono_500Medium, } from '@expo-google-fonts/jetbrains-mono';
import { InstrumentSerif_400Regular_Italic } from '@expo-google-fonts/instrument-serif';
export function useAppFonts() {
    const [loaded] = useArchivo({
        Archivo_600SemiBold,
        Archivo_700Bold,
        Archivo_800ExtraBold,
        ArchivoNarrow_500Medium,
        ArchivoNarrow_700Bold,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        JetBrainsMono_400Regular,
        JetBrainsMono_500Medium,
        InstrumentSerif_400Regular_Italic,
    });
    return loaded;
}
