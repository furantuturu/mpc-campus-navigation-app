import { areaDetailsSheet } from "@/constants/helpers/helper";
import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData } from "@/types/types";
import { Image } from "expo-image";
import { useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";

interface MarkerImgProps {
    markerAreaData: AreaData;
    image: any;
}

interface TouchStartData {
    x: number;
    y: number;
    time: number;
}

export default function MarkerImg({ markerAreaData, image }: MarkerImgProps) {
    const { showAreaSheet, setShowAreaSheet, setAreaData, areaData, setAreaCoordinates, setCameraFocus } = useMyStoreV2();

    const [touchStart, setTouchStart] = useState<TouchStartData | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const sameID = markerAreaData.id === areaData.id;

    async function onMarkerPress() {
        if (showAreaSheet) {
            setAreaData(markerAreaData);
        } else {
            await areaDetailsSheet(markerAreaData, setAreaData, setShowAreaSheet);
        }

        setCameraFocus(true);
        setAreaCoordinates([markerAreaData.coordinates.longitude, markerAreaData.coordinates.latitude]);
    }

    function handleTouchStart(event: GestureResponderEvent) {
        const { locationX, locationY } = event.nativeEvent;

        setTouchStart({
            x: locationX,
            y: locationY,
            time: Date.now()
        });

        setIsDragging(false);
    }

    function handleTouchMove(event: GestureResponderEvent) {
        if (!touchStart) return;

        const { locationX, locationY } = event.nativeEvent;

        const distance = Math.sqrt(
            Math.pow(locationX - touchStart.x, 2) +
            Math.pow(locationY - touchStart.y, 2)
        );

        //* If moved more than threshold, consider it dragging
        if (distance > 10) {
            setIsDragging(true);
        }
    }

    function handleTouchEnd() {
        if (!touchStart) return;

        const timeDiff = Date.now() - touchStart.time;

        //* If it's a quick tap without dragging, handle marker press
        if (!isDragging && timeDiff < 300) {
            onMarkerPress();
        }

        setTouchStart(null);
        setIsDragging(false);
    }

    return (
        <View
            style={styles.outer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Image source={image} style={sameID ? styles.bigMarker : styles.marker} />
        </View>
    );
}

const styles = StyleSheet.create({
    marker: {
        width: 20,
        height: 27
    },
    bigMarker: {
        width: 30,
        height: 37
    },
    outer: {
        alignItems: "center",
        pointerEvents: 'box-none'
    }
});