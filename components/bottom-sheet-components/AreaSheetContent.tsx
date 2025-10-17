import { navigationModePanoramas } from "@/constants/areaPanoramas";
import { getRoute } from "@/constants/helpers/helper";
import { useMyStoreV2, useUserLocStore } from "@/store/useMyStore";
import { Floor } from "@/types/types";
import { useIsFocused } from "@react-navigation/native";
import { isNull, trim } from "es-toolkit";
import { split } from "es-toolkit/compat";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import { ActivityIndicator, Icon, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PanoramaViewer from "../PanoramaViewer";

export default function AreaSheetContent() {
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const router = useRouter();
    const { showAreaSheet, setShowAreaSheet, areaData, setRoutePath, setRouteDistance } = useMyStoreV2();
    const { setIsNavigating, userCoordinates, isLocationServiceEnabled } = useUserLocStore();
    const [isRouteFetching, setIsRouteFetching] = useState(false);
    const [isViewerVisible, setIsViewerVisible] = useState(false);
    const areaCoords = [areaData.coordinates.longitude, areaData.coordinates.latitude];
    const panoramaImg = navigationModePanoramas[areaData.imageFileName];

    useEffect(() => {
        if (showAreaSheet && !isFocused) {
            router.dismiss();
        }
    }, [showAreaSheet]);

    if (!showAreaSheet) return null;

    function onPanoramaOpen() {
        setIsViewerVisible(true);
    };

    function onPanoramaClose() {
        setIsViewerVisible(false);
    };

    async function dismissAreaSheet() {
        setShowAreaSheet(false);
    }

    async function getAreaRoute() {
        if (!isLocationServiceEnabled) {
            Alert.alert("Location services is required for this app", "Location is needed to make the routing work");
            return;
        }

        if (isNull(userCoordinates)) {
            Alert.alert("Can't get your location", "GPS button still off, make sure you turn it on (make sure you are also inside the campus) and wait for your location to appear on map and get the route again");
            return;
        }

        setIsRouteFetching(true);

        new Promise((resolve) => {
            setTimeout(() => {
                resolve("Fetching...");
            }, 1000);
        })
            .then(async (status) => {
                const floor = trim(split(areaData.floor, "/")[1]) as Floor;
                getRoute(userCoordinates!, areaCoords, floor, setRoutePath, setRouteDistance);
            })
            .finally(() => {
                setIsRouteFetching(false);
                setIsNavigating(true);
            });
    }

    return (
        <View style={[styles.container, { bottom: insets.bottom + 10 }]}>
            <View style={styles.titleView}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyles} variant="titleLarge">{areaData.name}</Text>
                    <View style={styles.areaOriginDetail}>
                        <Text variant="labelSmall">Category: {areaData.category},</Text>
                        <Text variant="labelSmall">Floor: {split(areaData.floor, '/')[0]},</Text>
                        <Text variant="labelSmall">Building: {areaData.building ?? "N/A"}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.buttonStyles, { backgroundColor: "#eee" }]}
                        android_ripple={{
                            color: 'rgba(0, 0, 0, 0.2)',
                            borderless: false,
                            foreground: true,
                        }}
                        onPress={onPanoramaOpen}
                        disabled={isRouteFetching}
                    >
                        <Icon source="panorama-variant" size={25} color="black" />
                    </Pressable>
                    <Pressable
                        style={[styles.buttonStyles, { backgroundColor: "#565656" }]}
                        android_ripple={{
                            color: 'rgba(0, 0, 0, 0.2)',
                            borderless: false,
                            foreground: true,
                        }}
                        onPress={getAreaRoute}
                        disabled={isRouteFetching}
                    >
                        {isRouteFetching
                            ? <ActivityIndicator size={25} color="white" />
                            : <Icon source="map-marker-path" size={25} color="white" />
                        }
                        <Text style={styles.buttonText}>Get Route</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.buttonStyles, { backgroundColor: "#ff4444ff" }]}
                        android_ripple={{
                            color: 'rgba(0, 0, 0, 0.2)',
                            borderless: false,
                            foreground: true,
                        }}
                        onPress={dismissAreaSheet}
                        disabled={isRouteFetching}
                    >
                        <Icon source="close" size={25} color="white" />
                        <Text style={styles.buttonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
            <Modal
                visible={isViewerVisible}
                animationType="fade"
                onRequestClose={onPanoramaClose}
                statusBarTranslucent
                backdropColor="#000"
            >
                {isViewerVisible && (
                    <PanoramaViewer imageSource={panoramaImg} />
                )}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderRadius: 24,
        backgroundColor: "white",
        width: '100%',
        alignItems: 'center',
        zIndex: 1000
    },
    titleView: {
        marginBlock: 20,
    },
    titleContainer: {
        marginBottom: 15,
    },
    titleStyles: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    areaOriginDetail: {
        flexDirection: "row",
        justifyContent: 'center',
        gap: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: "center",
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