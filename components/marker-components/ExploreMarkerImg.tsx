import { exploreModePanoramas } from "@/constants/explorePanoramas";
import { ExploreData } from "@/types/types";
import { Image } from "expo-image";
import { useState } from "react";
import { GestureResponderEvent, Modal, StyleSheet, View } from "react-native";
import PanoramaViewer from "../PanoramaViewer";

interface MarkerImgProps {
    markerExploreData: ExploreData;
    image: any;
}

interface TouchStartData {
    x: number;
    y: number;
    time: number;
}

export default function ExploreMarkerImg({ markerExploreData, image }: MarkerImgProps) {
    const [isViewerVisible, setIsViewerVisible] = useState(false);
    const [touchStart, setTouchStart] = useState<TouchStartData | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const panoramaImg = exploreModePanoramas[markerExploreData.imageFileName];

    function onPanoramaOpen() {
        setIsViewerVisible(true);
    };

    function onPanoramaClose() {
        setIsViewerVisible(false);
    };

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
            onPanoramaOpen();
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
            <Image source={image} style={styles.marker} transition={100} />

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
    marker: {
        width: 30,
        height: 30
    },
    outer: {
        alignItems: "center",
        pointerEvents: 'box-none'
    }
});