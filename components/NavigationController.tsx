import { useMyStoreV2, useUserLocStore } from "@/store/useMyStore";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { round } from "es-toolkit";
import { split } from "es-toolkit/compat";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NavigationController() {
    const insets = useSafeAreaInsets();
    const { routeDistance, areaData, setShowAreaSheet } = useMyStoreV2();
    const { setIsNavigating } = useUserLocStore();

    async function onCancel() {
        setIsNavigating(false);
        setShowAreaSheet(false);
        await TrueSheet.dismiss("sub-sheet");
        await TrueSheet.present("main-sheet");
    }

    return (
        <View style={[styles.container, { bottom: insets.bottom + 10 }]}>
            <Text style={styles.titleStyles} variant="titleLarge">{areaData.name}</Text>
            <View style={[styles.viewContainer, { gap: 15 }]}>
                <Text variant="titleMedium">Distance: {round(routeDistance, 2)}m</Text>
                <Text variant="titleMedium">Floor: {split(areaData.floor, '/')[0]}</Text>
            </View>
            <View style={styles.viewContainer}>
                <Pressable
                    style={[styles.buttonStyles, { backgroundColor: "#3887be" }]}
                    android_ripple={{
                        color: 'rgba(0, 0, 0, 0.2)',
                        borderless: false,
                        foreground: true,
                    }}
                >
                    <Icon source="navigation-variant" size={25} color="white" />
                    <Text style={styles.buttonText}>Navigate</Text>
                </Pressable>
                <Pressable
                    style={[styles.buttonStyles, { backgroundColor: "#ff4444ff" }]}
                    android_ripple={{
                        color: 'rgba(0, 0, 0, 0.2)',
                        borderless: false,
                        foreground: true,
                    }}
                    onPress={onCancel}
                >
                    <Icon source="close" size={25} color="white" />
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        padding: 20,
        borderRadius: 24,
        backgroundColor: "white",
        width: '100%',
        alignItems: 'center'
    },
    viewContainer: {
        flexDirection: 'row',
    },
    titleStyles: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    buttonStyles: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        paddingBlock: 10,
        paddingInline: 20,
        margin: 5,
        borderRadius: 999,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        overflow: 'hidden'
    },
    buttonText: {
        fontWeight: "bold",
        color: "white"
    }
});