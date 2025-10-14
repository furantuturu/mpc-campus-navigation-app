import { isUserInsideCampus } from "@/constants/helpers/helper";
import { useMyStoreV2, useUserLocStore } from "@/store/useMyStore";
import { Accuracy, enableNetworkProviderAsync, getCurrentPositionAsync, hasServicesEnabledAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ActivityIndicator, Icon, TouchableRipple } from "react-native-paper";

export default function ActivateUserLocation() {
    const { showAreaSheet, setCameraFocus, setAreaCoordinates } = useMyStoreV2();
    const { showUserLocation, setShowUserLocation, setUserCoordinates, isLocationServiceEnabled, setIsLocationServiceEnabled, isNavigating } = useUserLocStore();
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            const enabled = await hasServicesEnabledAsync();
            setIsLocationServiceEnabled(enabled);
        }, 2500);

        return () => clearInterval(interval);
    }, [isNavigating, setIsLocationServiceEnabled]);

    async function enableLocationService() {
        try {
            setIsGettingLocation(true);
            await enableNetworkProviderAsync();
        } catch (error) {
            Alert.alert(
                'Location Services Required',
                'Please enable location services to use this feature.',
            );
        } finally {
            setIsGettingLocation(false);
        }
    }

    async function getInitUserLocation() {
        try {
            setIsGettingLocation(true);
            const { status } = await requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission denied");
                return;
            }

            const location = await getCurrentPositionAsync({
                accuracy: Accuracy.BestForNavigation
            });
            const userCoords = [location.coords.longitude, location.coords.latitude];

            const isInside = isUserInsideCampus(userCoords);
            if (!isInside) {
                Alert.alert('Outside Boundary', 'You are currently outside the campus.',);
                setShowUserLocation(false);
                return;
            }

            setCameraFocus(true);
            setAreaCoordinates(userCoords);
            setUserCoordinates(userCoords);
        } catch (error) {
            setUserCoordinates(null);
            setShowUserLocation(false);
            console.error("Error getting location: ", error);
            Alert.alert('Error', 'Failed to get your location. Please try again.');
        } finally {
            setIsGettingLocation(false);
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
            const icon = isGettingLocation ? <ActivityIndicator size={25} color="#000" /> : <Icon source="crosshairs-gps" size={25} color="#5cb85c" />;
            return icon;
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
                disabled={isGettingLocation}
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
        top: 400,
        right: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: 50,
        height: 50,
        elevation: 5,
    }
});