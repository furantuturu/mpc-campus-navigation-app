import { useMyStoreV2, useUserLocStore } from "@/store/useMyStore";
import { Accuracy, enableNetworkProviderAsync, getCurrentPositionAsync, hasServicesEnabledAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { Icon, TouchableRipple } from "react-native-paper";

export default function ActivateUserLocation() {
    const { showAreaSheet, setCameraFocus, setAreaCoordinates } = useMyStoreV2();
    const { showUserLocation, setShowUserLocation, setUserCoordinates, isLocationServiceEnabled, setIsLocationServiceEnabled, isNavigating } = useUserLocStore();

    useEffect(() => {
        const interval = setInterval(async () => {
            const enabled = await hasServicesEnabledAsync();
            setIsLocationServiceEnabled(enabled);
        }, 2500);

        return () => clearInterval(interval);
    }, [isNavigating, setIsLocationServiceEnabled]);

    async function enableLocationService() {
        try {
            await enableNetworkProviderAsync();
        } catch (error) {
            Alert.alert(
                'Location Services Required',
                'Please enable location services to use this feature.',
            );
            return;
        }
    }

    async function getInitUserLocation() {
        try {
            const { status } = await requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission denied");
                return;
            }

            const position = await getCurrentPositionAsync({
                accuracy: Accuracy.BestForNavigation
            });

            setCameraFocus(true);
            setAreaCoordinates([position.coords.longitude, position.coords.latitude]);
            setUserCoordinates([position.coords.longitude, position.coords.latitude]);
        } catch (error) {
            setUserCoordinates(null);
            console.error("Error getting location: ", error);
            Alert.alert('Error', 'Failed to get your location. Please try again.');
        }
    }

    async function handleLocationService() {
        try {
            const { status } = await requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission denied");
                return;
            }

            const enabled = await hasServicesEnabledAsync();

            if (!enabled) {
                enableLocationService();
            }

        } catch (error) {
            console.error("Error checking location status:", error);
        }
    }

    async function handleLocationDisplay() {
        if (!showUserLocation) {
            getInitUserLocation();
            setShowUserLocation(true);
        } else {
            setUserCoordinates(null);
            setShowUserLocation(false);
        }
    }

    function GpsIcon() {
        if (!isLocationServiceEnabled) {
            return <Icon source="crosshairs-question" size={25} color="#ff4444ff" />;
        }

        if (isLocationServiceEnabled && showUserLocation) {
            return <Icon source="crosshairs-gps" size={25} color="#5cb85c" />;
        } else {
            return <Icon source="crosshairs-off" size={25} color="#000" />;
        }
    }

    return (
        <>
            <TouchableRipple
                style={[styles.container, { display: showAreaSheet ? 'none' : 'flex' }]}
                borderless
                rippleColor="rgba(0, 0, 0, 0.12)"
                onPress={!isLocationServiceEnabled ? handleLocationService : handleLocationDisplay}
            >
                <GpsIcon />
            </TouchableRipple>

        </>
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