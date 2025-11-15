import { navigationModePanoramas } from "@/constants/areaPanoramas";
import { getRoute, isUserInsideCampus } from "@/constants/helpers/helper";
import { useMyStoreV2, useUserLocStore } from "@/store/useMyStore";
import { Floor } from "@/types/types";
import { round, trim } from "es-toolkit";
import { split } from "es-toolkit/compat";
import {
    Accuracy,
    enableNetworkProviderAsync,
    hasServicesEnabledAsync,
    LocationSubscription,
    requestForegroundPermissionsAsync,
    watchHeadingAsync,
    watchPositionAsync
} from "expo-location";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PanoramaViewer from "./PanoramaViewer";

export default function NavigationController() {
    const insets = useSafeAreaInsets();
    const { routeDistance, areaData, setShowAreaSheet, setRoutePath, setRouteDistance } = useMyStoreV2();
    const { setIsNavigating, navigationMode, setNavigationMode, setUserCameraHeading, setUserCoordinates, userFollowMode, setUserFollowMode, setShowUserLocation } = useUserLocStore();
    const [locationSubscription, setLocationSubscription] = useState<LocationSubscription | null>(null);
    const [headingSubscription, setHeadingSubscription] = useState<LocationSubscription | null>(null);
    const [locSpeed, setLocSpeed] = useState<number | null>(null);
    const [isStarting, setIsStarting] = useState(false);
    let routeCalculationTimeoutRef = useRef<number | null>(null);
    const [isViewerVisible, setIsViewerVisible] = useState(false);

    useEffect(() => {
        return () => {
            locationSubscription?.remove();
        };
    }, [locationSubscription]);


    const panoramaImg = navigationModePanoramas[areaData.imageFileName];

    function onPanoramaOpen() {
        setIsViewerVisible(true);
    };

    function onPanoramaClose() {
        setIsViewerVisible(false);
    };

    async function locationTrack() {
        try {
            setIsStarting(true);
            const enabled = await hasServicesEnabledAsync();

            if (!enabled) {
                await enableNetworkProviderAsync();
            }

            const { status } = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required for navigation.');
                return;
            }

            const areaCoords = [areaData.coordinates.longitude, areaData.coordinates.latitude];
            const floor = trim(split(areaData.floor, "/")[1]) as Floor;

            const locSubscription = await watchPositionAsync(
                {
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 5,
                    mayShowUserSettingsDialog: true
                },
                (newLocation) => {
                    console.log(newLocation.coords.accuracy);

                    if (newLocation.coords.accuracy && newLocation.coords.accuracy < 20) {
                        const userCoords = [newLocation.coords.longitude, newLocation.coords.latitude];

                        const isInside = isUserInsideCampus(userCoords);
                        if (!isInside) {
                            Alert.alert('Outside Boundary', 'You are currently outside the campus.', [
                                {
                                    text: "Cancel operation",
                                    style: 'cancel',
                                    onPress: () => {
                                        stopLocationTrack();
                                        onCancel();
                                        setShowUserLocation(false);
                                    }
                                }
                            ]);
                            return;
                        }

                        setUserCoordinates(userCoords);

                        if (routeCalculationTimeoutRef.current) {
                            clearTimeout(routeCalculationTimeoutRef.current);
                        }

                        routeCalculationTimeoutRef.current = setTimeout(() => {
                            getRoute(userCoords, areaCoords, floor, setRoutePath, setRouteDistance);
                            routeCalculationTimeoutRef.current = null;
                        }, 100);

                    }

                    setLocSpeed(newLocation.coords.speed);
                    if (newLocation.coords.heading !== null) {
                        setUserCameraHeading(newLocation.coords.heading);
                    }
                }
            );

            setLocationSubscription(locSubscription);

            const headSubscription = await watchHeadingAsync((headingData) => {
                if (!locSpeed || locSpeed < 1) {
                    setUserCameraHeading(headingData.trueHeading);
                }
            });

            setHeadingSubscription(headSubscription);
            setNavigationMode(true);
        } catch (error) {
            stopLocationTrack();
            console.error('Error getting location:', error);
            Alert.alert('Error', 'Failed to get your location. Please try again.');
        } finally {
            setIsStarting(false);
        }
    }

    function stopLocationTrack() {
        if (locationSubscription) {
            locationSubscription.remove();
            setLocationSubscription(null);
        }
        if (headingSubscription) {
            headingSubscription.remove();
            setHeadingSubscription(null);
        }
        setNavigationMode(false);
        setUserFollowMode(false);
    }

    async function onCancel() {
        setIsNavigating(false);
        setShowAreaSheet(false);
        setRoutePath(null);
    }

    return (
        <View style={[styles.container, { bottom: insets.bottom + 10 }]}>
            <Text style={styles.titleStyles} variant="titleLarge">{areaData.name}</Text>
            <View style={[styles.viewContainer, { gap: 15 }]}>
                <Text style={styles.navigateDetailText} variant="titleMedium">Distance: {round(routeDistance, 2)}m</Text>
                <Text style={styles.navigateDetailText} variant="titleMedium">Floor: {split(areaData.floor, '/')[0]}</Text>
            </View>
            <View style={styles.viewContainer}>
                <Pressable
                    style={[styles.buttonStyles, { backgroundColor: "#eee" }]}
                    android_ripple={{
                        color: 'rgba(0, 0, 0, 0.2)',
                        borderless: false,
                        foreground: true,
                    }}
                    onPress={onPanoramaOpen}
                >
                    <Icon source="panorama-variant" size={25} color="black" />
                </Pressable>
                <Pressable
                    style={[styles.buttonStyles, { backgroundColor: "#3887be" }]}
                    android_ripple={{
                        color: 'rgba(0, 0, 0, 0.2)',
                        borderless: false,
                        foreground: true,
                    }}
                    onPress={navigationMode ? stopLocationTrack : locationTrack}
                    disabled={isStarting}
                >
                    {isStarting
                        ? <ActivityIndicator size={25} color="white" />
                        : <Icon source="navigation-variant" size={25} color="white" />
                    }
                    <Text style={styles.buttonText}>{navigationMode ? "Stop" : "Start"} Navigate</Text>
                </Pressable>
                {navigationMode
                    ?
                    <Pressable
                        style={[styles.buttonStyles, { backgroundColor: "#565656" }]}
                        android_ripple={{
                            color: 'rgba(0, 0, 0, 0.2)',
                            borderless: false,
                            foreground: true,
                        }}
                        onPress={() => setUserFollowMode(!userFollowMode)}
                    >
                        <Text style={styles.buttonText}>{userFollowMode ? "Stop Follow" : "Start Follow"}</Text>
                    </Pressable>
                    :
                    <Pressable
                        style={[styles.buttonStyles, { backgroundColor: "#ff4444ff" }]}
                        android_ripple={{
                            color: 'rgba(0, 0, 0, 0.2)',
                            borderless: false,
                            foreground: true,
                        }}
                        onPress={onCancel}
                    >
                        <Icon source="close" size={25} color="white" />
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>

                }
            </View>
            <Modal
                visible={isViewerVisible}
                animationType="fade"
                onRequestClose={onPanoramaClose}
                statusBarTranslucent
                backdropColor="#000"
            >
                <PanoramaViewer imageSource={panoramaImg} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        padding: 20,
        borderRadius: 24,
        backgroundColor: "white",
        width: '100%',
        alignItems: 'center',
        zIndex: 1000
    },
    viewContainer: {
        flexDirection: 'row',
    },
    titleStyles: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15,
        color: "black"
    },
    navigateDetailText: {
        color: "black"
    },
    buttonStyles: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        paddingBlock: 10,
        paddingInline: 20,
        margin: 5,
        borderRadius: 999,
        elevation: 3,
        overflow: 'hidden'
    },
    buttonText: {
        fontWeight: "bold",
        color: "white"
    }
});