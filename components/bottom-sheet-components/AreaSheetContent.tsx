import { useMyStoreV2 } from "@/store/useMyStore";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";

export default function AreaSheetContent() {
    const { setShowAreaSheet, areaData } = useMyStoreV2();

    async function dismissAreaSheet() {
        await TrueSheet.dismiss("sub-sheet");
        await TrueSheet.present("main-sheet", 1);
        setShowAreaSheet(false);
    }

    return (
        <>
            <View style={styles.titleView}>
                <Text style={styles.titleStyles} variant="titleLarge">{areaData.name}</Text>
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
    titleStyles: {
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: "center",
    }
});