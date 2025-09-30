import { getLastKnownPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { Alert, StyleSheet } from "react-native";
import { Icon, TouchableRipple } from "react-native-paper";

export default function ActivateUserLocation() {

    async function handlePress() {
        try {
            const { status } = await requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            const position = await getLastKnownPositionAsync();
            Alert.alert(`${position?.coords}`);
        } catch (error) {
            console.error("Error getting location: ", error);
        }
    }

    return (
        <TouchableRipple
            style={styles.container}
            borderless
            rippleColor="rgba(0, 0, 0, 0.12)"
            onPress={handlePress}
        >
            <Icon source="crosshairs-question" size={25} color="#ff4444ff" />
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 9999,
        backgroundColor: "white",
        position: "absolute",
        top: '50%',
        right: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: 50,
        height: 50,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    }
});