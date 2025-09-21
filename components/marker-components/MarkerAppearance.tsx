// MapMarker.jsx
import { MarkerView } from "@maplibre/maplibre-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MarkerAppearance() {

    return (
        <MarkerView coordinate={[125.145000, 6.117617]} anchor={{ x: 0.5, y: 1 }}>
            <View pointerEvents="box-none" style={styles.outer}>
                <Pressable
                    onPress={() => console.log("marker tapped")}
                    style={({ pressed }) => [
                        styles.pressable,
                        pressed && styles.pressed,
                    ]}
                    hitSlop={8} // small hitSlop makes tapping easier (use sparingly)
                >
                    <View style={styles.label}>
                        <Text numberOfLines={1} style={styles.labelText}>
                            Room 102
                        </Text>
                    </View>

                    <View style={styles.pinBody} />
                    <View style={styles.pinTip} />
                </Pressable>
            </View>
        </MarkerView>
    );
}

const styles = StyleSheet.create({
    outer: {
        alignItems: "center",
    },
    pressable: {
        alignItems: "center",
    },
    pressed: {
        opacity: 0.85,
    },
    label: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: "white",
        elevation: 2, // android shadow
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        marginBottom: 1,
        minWidth: 40,
        maxWidth: 140,
    },
    labelText: {
        fontSize: 12,
        lineHeight: 14,
        textAlign: "center",
    },
    pinBody: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#333",
        marginBottom: 0,
    },
    // triangle pointing down (pin tip)
    pinTip: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 8,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "#333",
        marginTop: -1,
    },
});
