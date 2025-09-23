import { useMyStoreV2 } from "@/store/useMyStore";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { split } from "es-toolkit/compat";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";

export default function AreaSheetContent() {
    const { setShowAreaSheet, areaData } = useMyStoreV2();

    async function dismissAreaSheet() {
        setShowAreaSheet(false);
        await TrueSheet.dismiss("sub-sheet");
        await TrueSheet.present("main-sheet");
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
                    <Button
                        mode="elevated"
                        icon="navigation-variant"
                        buttonColor="#565656"
                        textColor="white"
                        onPress={dismissAreaSheet}
                    >
                        Navigate
                    </Button>
                    <Button
                        mode="elevated"
                        icon="close"
                        buttonColor="#db4f4fff"
                        textColor="white"
                        onPress={dismissAreaSheet}
                    >
                        Close
                    </Button>
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
    }
});