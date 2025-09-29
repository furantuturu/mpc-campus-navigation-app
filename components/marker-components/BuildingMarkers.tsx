import {
    gate1NameMarker,
    gate2NameMarker,
    gymNameMarker,
    initAnchor,
    mareNameMarker,
    maritimeNameMarker,
    oldNameMarker,
    susanaNameMarker
} from "@/constants/markerConfig";
import { MarkerView } from "@maplibre/maplibre-react-native";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function BuildingMarkers() {
    return (
        <>
            <MarkerView coordinate={[125.144867, 6.117568]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.textContainer}>
                    <Image source={gymNameMarker} style={styles.oldAndGymMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.144968, 6.117134]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.textContainer}>
                    <Image source={maritimeNameMarker} style={styles.maritimeMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.144356, 6.117434]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.textContainer}>
                    <Image source={susanaNameMarker} style={styles.susanaMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.144790, 6.117853]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.textContainer}>
                    <Image source={oldNameMarker} style={styles.oldAndGymMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.143916, 6.117341]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.textContainer}>
                    <Image source={mareNameMarker} style={styles.marEMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.145789, 6.117183]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.textContainer}>
                    <Image source={gate1NameMarker} style={styles.gateMarker} />
                </View>
            </MarkerView>
            <MarkerView coordinate={[125.145648, 6.117559]} anchor={initAnchor} allowOverlap={true}>
                <View style={styles.textContainer}>
                    <Image source={gate2NameMarker} style={styles.gateMarker} />
                </View>
            </MarkerView>
        </>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        alignItems: "center",
        pointerEvents: 'box-none'
    },
    maritimeMarker: {
        width: 100,
        height: 25
    },
    oldAndGymMarker: {
        width: 80,
        height: 20
    },
    susanaMarker: {
        width: 100,
        height: 20
    },
    marEMarker: {
        width: 70,
        height: 20
    },
    gateMarker: {
        width: 40,
        height: 15
    },
});