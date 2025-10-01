import { checkLocationServices } from "@/constants/helpers/helper";
import { useMyStoreV2, useUserLocStore } from "@/store/useMyStore";
import { Accuracy, getCurrentPositionAsync, hasServicesEnabledAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Icon, TouchableRipple } from "react-native-paper";

export default function ActivateUserLocation() {
    const { showAreaSheet, setAreaCoordinates, setCameraFocus } = useMyStoreV2();
    const { showUserLocation, setShowUserLocation, userCoordinates, setUserCoordinates } = useUserLocStore();
    const [isLocationDisabled, setIsLocationDisabled] = useState(true);

    useEffect(() => {
        async function checkService() {
            const serviceEnabled = await hasServicesEnabledAsync();
            if (!serviceEnabled) {
                setIsLocationDisabled(true);
                setUserCoordinates(null);
                checkLocationServices();
            } else {
                setIsLocationDisabled(false);
            }
        }

        checkService();
    }, [setUserCoordinates]);

    if (showAreaSheet) return null;

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


            setIsLocationDisabled(false);
            setShowUserLocation(true);
            setUserCoordinates([position.coords.longitude, position.coords.latitude]);
        } catch (error) {
            console.error("Error getting location: ", error);
            Alert.alert('Error', 'Failed to get your location. Please try again.');
        }
    }

    function toggleShowUserLocation() {
        if (!showUserLocation) {
            if (userCoordinates) {
                setCameraFocus(true);
                setAreaCoordinates(userCoordinates);
            }
            setShowUserLocation(true);
        } else {
            setShowUserLocation(false);
        }
    }

    function handlePress() {
        if (isLocationDisabled) {
            getInitUserLocation();
        }

        toggleShowUserLocation();
    }

    function GpsIcon() {
        if (isLocationDisabled) {
            return <Icon source="crosshairs-question" size={25} color="#ff4444ff" />;
        }

        if (showUserLocation) {
            return <Icon source="crosshairs-gps" size={25} color="#5cb85c" />;
        }

        return <Icon source="crosshairs-off" size={25} />;
    }


    return (
        <TouchableRipple
            style={styles.container}
            borderless
            rippleColor="rgba(0, 0, 0, 0.12)"
            onPress={handlePress}
        >
            <GpsIcon />
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