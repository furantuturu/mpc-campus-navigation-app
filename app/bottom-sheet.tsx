import OutdoorAreaActionButtons from "@/components/bottom-sheet-components/OutdoorAreaActionButton";
import ToiletAreaActionButtons from "@/components/bottom-sheet-components/ToiletAreaActionButton";
import { floorName } from "@/constants/floorData";
import { useMyStoreV2 } from "@/store/useMyStore";
import { isEqual } from "es-toolkit";
import { lazy, Suspense, useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Divider, Text } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function FloorSheetContent() {
    const { selectedCategory, selectedFloor } = useMyStoreV2();
    const insets = useSafeAreaInsets();

    const LazyOfficeAreaActionButtons = useMemo(
        () => lazy(() => import("@/components/bottom-sheet-components/OfficeAreaActionButton")),
        [selectedCategory, selectedFloor]
    );

    const LazyRoomAreaActionButtons = useMemo(
        () => lazy(() => import("@/components/bottom-sheet-components/RoomAreaActionButton")),
        [selectedCategory, selectedFloor]
    );

    const selectedFloorName: string = floorName[selectedFloor];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.floorTitleView} variant="titleMedium">
                Current Floor: <Text style={styles.floorNameText} variant="titleLarge">
                    {selectedCategory !== "Outdoors" ? selectedFloorName : "Ground"}
                </Text>
            </Text>
            <Divider />
            <ScrollView nestedScrollEnabled alwaysBounceVertical contentContainerStyle={{ paddingBottom: insets.bottom + 230 }}>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    floorTitleView: {
        marginBottom: 20
    },
    floorNameText: {
        fontWeight: 'bold'
    },
    loadingStyle: {
        marginBlockStart: 20
    }
});