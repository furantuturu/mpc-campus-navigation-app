import { useMyStoreV2 } from "@/store/useMyStore";
import { isEqual } from "es-toolkit";
import { lazy, Suspense } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Divider, Text } from 'react-native-paper';

//* Components
import OutdoorAreaActionButtons from "./OutdoorAreaActionButton";
import ToiletAreaActionButtons from "./ToiletAreaActionButton";

export default function FloorSheetContent() {
    const { selectedCategory, selectedFloor } = useMyStoreV2();

    const LazyOfficeAreaActionButtons = lazy(() => import("./OfficeAreaActionButton"));
    const LazyRoomAreaActionButtons = lazy(() => import("./RoomAreaActionButton"));

    let selectedFloorName: string;
    switch (selectedFloor) {
        case "F1":
            selectedFloorName = "Floor 1 / Ground";
            break;
        case "F2":
            selectedFloorName = "Floor 2";
            break;
        case "F3":
            selectedFloorName = "Floor 3";
            break;
        default:
            selectedFloorName = "Floor 4";
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