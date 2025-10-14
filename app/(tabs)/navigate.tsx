import Map from "@/components/Map";
import NavigationComponents from "@/components/NavigationComponents";
import NonNavigationComponents from "@/components/NonNavigationComponents";
import { useUserLocStore } from "@/store/useMyStore";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Navigate() {
    const { isNavigating } = useUserLocStore();

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