import { Image } from "expo-image";
import { useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";

interface MarkerImgProps {
    image: any;
}

interface TouchStartData {
    x: number;
    y: number;
    time: number;
}

export default function MarkerImg({ image }: MarkerImgProps) {
    const [touchStart, setTouchStart] = useState<TouchStartData | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    function onMarkerPress() {
        console.log("pressed");
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

    //TODO figure out if i ever needed this code for the drag + touch
    return (
        <View style={styles.outer} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <Image source={image} style={styles.marker} />
        </View>
    );
}

const styles = StyleSheet.create({
    marker: {
        width: 25,
        height: 32
    },
    outer: {
        alignItems: "center",
        pointerEvents: 'box-none'
    }
});