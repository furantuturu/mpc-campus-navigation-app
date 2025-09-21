import { useMyStoreV2 } from "@/store/useMyStore";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";

export default function MapDimensionToggle() {
    const { setCameraPitch } = useMyStoreV2();

    const [dimension, setDimension] = useState("2D");

    function handleDimension() {
        if (dimension === "2D") {
            setDimension("3D");
            setCameraPitch(60);
        } else {
            setDimension("2D");
            setCameraPitch(0);
        }
    }

    return (
        <TouchableRipple
            style={styles.container}
            borderless
            rippleColor="rgba(0, 0, 0, 0.12)"
            onPress={handleDimension}
        >
            <Text style={styles.text}>{dimension}</Text>
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 9999,
        backgroundColor: "white",
        position: "absolute",
        top: 250,
        right: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: 50,
        height: 50,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 6,
    },
    text: {
        fontWeight: "bold",
    }
});