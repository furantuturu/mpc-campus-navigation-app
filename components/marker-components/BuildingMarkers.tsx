import { initAnchor } from "@/constants/markerConfig";
import { MarkerView } from "@maplibre/maplibre-react-native";
import { StyleSheet, Text } from "react-native";

export default function BuildingMarkers() {
    return (
        <>
            <MarkerView coordinate={[125.144867, 6.117568]} anchor={initAnchor} style={styles.textContainer}>
                <Text style={styles.textStyle}>Gym Building</Text>
            </MarkerView>
            <MarkerView coordinate={[125.144968, 6.117134]} anchor={initAnchor} style={styles.textContainer}>
                <Text style={styles.textStyle}>Maritime Building</Text>
            </MarkerView>
            <MarkerView coordinate={[125.144356, 6.117434]} anchor={initAnchor} style={styles.textContainer}>
                <Text style={styles.textStyle}>Susana Building</Text>
            </MarkerView>
            <MarkerView coordinate={[125.144790, 6.117853]} anchor={initAnchor} style={styles.textContainer}>
                <Text style={styles.textStyle}>Old Building</Text>
            </MarkerView>
            <MarkerView coordinate={[125.143916, 6.117341]} anchor={initAnchor} style={styles.textContainer}>
                <Text style={styles.textStyle}>Mar-E Shop</Text>
            </MarkerView>
            <MarkerView coordinate={[125.145789, 6.117183]} anchor={initAnchor} style={styles.textContainer}>
                <Text style={styles.textStyle}>Gate 1</Text>
            </MarkerView>
            <MarkerView coordinate={[125.145648, 6.117559]} anchor={initAnchor} style={styles.textContainer}>
                <Text style={styles.textStyle}>Gate 2</Text>
            </MarkerView>
        </>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        alignItems: "center",
    },
    textStyle: {
        fontWeight: 'bold',
        color: "#fff",
        textShadowColor: '#000',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,

    }
});