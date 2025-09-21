import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData } from "@/types/types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { Pressable, StyleSheet, Text } from "react-native";

interface CustomButtonProps {
    areaData: AreaData;
    buttonColor: string;
}

export default function CustomButton({ areaData, buttonColor }: CustomButtonProps) {
    const { setShowAreaSheet, setAreaData } = useMyStoreV2();

    async function buttonSheetPress() {
        await TrueSheet.dismiss("main-sheet");
        await TrueSheet.present("sub-sheet", 1);
        setAreaData(areaData);
        setShowAreaSheet(true);
    }

    return (
        <Pressable style={[styles.buttonStyles, { backgroundColor: buttonColor }]} onPress={buttonSheetPress}>
            <Text style={styles.buttonText}>{areaData.name}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonStyles: {
        paddingBlock: 10,
        paddingInline: 20,
        margin: 5,
        borderRadius: 999,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontWeight: "bold",
        color: "#333"
    }
});