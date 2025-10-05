import FloorBottomSheet from "@/components/bottom-sheet-components/MapBottomSheet";
import Map from "@/components/Map";
import NavigationComponents from "@/components/NavigationComponents";
import NonNavigationComponents from "@/components/NonNavigationComponents";
import { useUserLocStore } from "@/store/useMyStore";
import { usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Navigate() {
    const { isNavigating } = useUserLocStore();
    const pathname = usePathname();

    return (
        <PaperProvider>
            <SafeAreaProvider>
                <View style={styles.container}>

                    <Map />
                    {isNavigating
                        ? <NavigationComponents />
                        : <NonNavigationComponents />
                    }
                </View>
                {!isNavigating && pathname !== "/" && <FloorBottomSheet />}
            </SafeAreaProvider>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        position: 'relative'
    }
});