import { areaDetailsSheet } from "@/constants/helpers/helper";
import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData } from "@/types/types";
import { Pressable, StyleSheet, Text } from "react-native";

interface CustomButtonProps {
    areaData: AreaData;
    buttonColor: string;
}

export default function CustomButton({ areaData, buttonColor }: CustomButtonProps) {
    const { setShowAreaSheet, setAreaData, setAreaCoordinates, setCameraFocus } = useMyStoreV2();

    async function buttonSheetPress() {
        await areaDetailsSheet(areaData, setAreaData, setShowAreaSheet);
        setAreaCoordinates([areaData.coordinates.longitude, areaData.coordinates.latitude]);
        setCameraFocus(true);
    }

    return (
        <Pressable
            style={[styles.buttonStyles, { backgroundColor: buttonColor }]}
            android_ripple={{
                color: 'rgba(0, 0, 0, 0.2)',
                borderless: false,
                foreground: true,
            }}
            onPress={buttonSheetPress}
        >
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
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        overflow: 'hidden'
    },
    buttonText: {
        fontWeight: "bold",
        color: "#333"
    }
});