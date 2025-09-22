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

    const selectedFloorName = isEqual(selectedFloor, "F1") ? "Floor 1 / Ground" : isEqual(selectedFloor, "F2") ? "Floor 2" : isEqual(selectedFloor, "F3") ? "Floor 3" : "Floor 4";

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