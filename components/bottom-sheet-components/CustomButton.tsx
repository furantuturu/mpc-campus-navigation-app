import { areaDetailsSheet } from "@/constants/helpers/helper";
import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData } from "@/types/types";
import { StyleSheet, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";

interface CustomButtonProps {
    areaData: AreaData;
    buttonColor: string;
}

export default function CustomButton({ areaData, buttonColor }: CustomButtonProps) {
    const { setShowAreaSheet, setAreaData, setAreaFocus } = useMyStoreV2();

    async function buttonSheetPress() {
        await areaDetailsSheet(areaData, setAreaData, setShowAreaSheet);
        setAreaFocus({
            coordinates: [areaData.coordinates.longitude, areaData.coordinates.latitude],
            zoomTo: 20
        });
    }

    return (
        <TouchableRipple
            style={[styles.buttonStyles, { backgroundColor: buttonColor }]}
            borderless
            rippleColor="rgba(0, 0, 0, 0.12)"
            onPress={buttonSheetPress}
        >
            <Text style={styles.buttonText}>{areaData.name}</Text>
        </TouchableRipple>
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
    },
    buttonText: {
        fontWeight: "bold",
        color: "#333"
    }
});