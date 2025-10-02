import { useMyStoreV2 } from "@/store/useMyStore";
import { isEqual } from "es-toolkit";
import { lazy, Suspense, useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Divider, Text } from 'react-native-paper';

//* Components
import OutdoorAreaActionButtons from "./OutdoorAreaActionButton";
import ToiletAreaActionButtons from "./ToiletAreaActionButton";
export default function FloorSheetContent() {
    const { selectedCategory, selectedFloor } = useMyStoreV2();

    const LazyOfficeAreaActionButtons = useMemo(
        () => lazy(() => import("./OfficeAreaActionButton")),
        [selectedCategory, selectedFloor]
    );

    const LazyRoomAreaActionButtons = useMemo(
        () => lazy(() => import("./RoomAreaActionButton")),
        [selectedCategory, selectedFloor]
    );

    let selectedFloorName: string;
    switch (selectedFloor) {
        case "1F":
            selectedFloorName = "1st Floor / Ground";
            break;
        case "2F":
            selectedFloorName = "2nd Floor";
            break;
        case "3F":
            selectedFloorName = "3rd Floor";
            break;
        default:
            selectedFloorName = "4th Floor";
            break;
    }

    return (
        <>
            <Text style={styles.title} variant="titleMedium">
                Current Floor: <Text style={styles.floorNameText} variant="titleLarge">
                    {selectedCategory !== "Outdoors" ? selectedFloorName : "Ground"}
                </Text>
            </Text>
            <Divider />
            <ScrollView nestedScrollEnabled>
                {isEqual(selectedCategory, "Offices") && (
                    <Suspense fallback={<ActivityIndicator style={styles.loadingStyle} size="large" />}>
                        <LazyOfficeAreaActionButtons />
                    </Suspense>
                )}
                {isEqual(selectedCategory, "Rooms") && (
                    <Suspense fallback={<ActivityIndicator style={styles.loadingStyle} size="large" />}>
                        <LazyRoomAreaActionButtons />
                    </Suspense>
                )}
                {isEqual(selectedCategory, "Toilets") && <ToiletAreaActionButtons />}
                {isEqual(selectedCategory, "Outdoors") && <OutdoorAreaActionButtons />}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBlock: 20
    },
    floorNameText: {
        fontWeight: 'bold'
    },
    loadingStyle: {
        marginBlockStart: 20
    }
});