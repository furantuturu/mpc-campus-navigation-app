import { useMyStoreV2 } from "@/store/useMyStore";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Icon, TouchableRipple } from "react-native-paper";

export default function MapDimensionToggle() {
    const { setCameraPitch } = useMyStoreV2();
    const [cameraToggle, setCameraToggle] = useState(false);

    function handleDimension() {
        if (!cameraToggle) {
            setCameraPitch(60);
            setCameraToggle(true);
        } else {
            setCameraPitch(0);
            setCameraToggle(false);
        }
    }

    return (
        <TouchableRipple
            style={styles.container}
            borderless
            rippleColor="rgba(0, 0, 0, 0.12)"
            onPress={handleDimension}
        >
            <Icon source="camera-switch" size={25} />
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
        elevation: 5,
    }
});