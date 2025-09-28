import { getRoute } from "@/constants/helpers/helper";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Floor } from "@/types/types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { split } from "es-toolkit/compat";
import { Pressable, StyleSheet, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";

export default function AreaSheetContent() {
    const { setShowAreaSheet, areaData, setRoutePath } = useMyStoreV2();
    const areaCoords = [areaData.coordinates.longitude, areaData.coordinates.latitude];

    async function dismissAreaSheet() {
        setShowAreaSheet(false);
        await TrueSheet.dismiss("sub-sheet");
        await TrueSheet.present("main-sheet");
    }

    function getAreaRoute() {
        const floor = split(areaData.floor, "/")[1] as Floor;
        getRoute([125.145324, 6.117679], areaCoords, floor, setRoutePath);
    }

    return (
        <>
            <View style={styles.titleView}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyles} variant="titleLarge">{areaData.name}</Text>
                    <View style={styles.areaOriginDetail}>
                        <Text variant="labelSmall">Category: {areaData.category},</Text>
                        <Text variant="labelSmall">Floor: {split(areaData.floor, '/')[0]},</Text>
                        <Text variant="labelSmall">Building: {areaData.building ?? "N/A"}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.buttonStyles, { backgroundColor: "#565656" }]}
                        android_ripple={{
                            color: 'rgba(0, 0, 0, 0.2)',
                            borderless: false,
                            foreground: true,
                        }}
                        onPress={getAreaRoute}
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
                        onPress={dismissAreaSheet}
                    >
                        <Icon source="close" size={25} color="white" />
                        <Text style={styles.buttonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
            <Divider />
            <View>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    titleView: {
        marginBlock: 20
    },
    titleContainer: {
        marginBottom: 15,
    },
    titleStyles: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    areaOriginDetail: {
        flexDirection: "row",
        justifyContent: 'center',
        gap: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: "center",
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