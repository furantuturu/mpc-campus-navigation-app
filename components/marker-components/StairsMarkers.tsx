import { initAnchor, stairsMarker } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { MarkerView } from "@maplibre/maplibre-react-native";
import { isEqual } from "es-toolkit";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function StairsMarkers() {
    const { selectedFloor } = useMyStoreV2();

    if (isEqual(selectedFloor, "1F")) return null;

    return (
        <>
            {!isEqual(selectedFloor, "3F") && (
                <MarkerView coordinate={[125.145420, 6.117348]} anchor={initAnchor} allowOverlap={true}>
                    <View style={styles.container}>
                        <Image source={stairsMarker} style={styles.stairsMarker} />
                    </View>
                </MarkerView>
            )}
            <MarkerView coordinate={[125.144770, 6.117096]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.container}>
                    <Image source={stairsMarker} style={styles.stairsMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.144294, 6.117687]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.container}>
                    <Image source={stairsMarker} style={styles.stairsMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.144427, 6.117252]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.container}>
                    <Image source={stairsMarker} style={styles.stairsMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.143948, 6.117192]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.container}>
                    <Image source={stairsMarker} style={styles.stairsMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.144555, 6.116918]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.container}>
                    <Image source={stairsMarker} style={styles.stairsMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.145084, 6.117224]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.container}>
                    <Image source={stairsMarker} style={styles.stairsMarker} />
                </View>
            </MarkerView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        pointerEvents: 'box-none'
    },
    stairsMarker: {
        width: 12,
        height: 12
    }
});