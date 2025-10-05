import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { StyleSheet } from "react-native";

//* Components
import { useMyStoreV2 } from "@/store/useMyStore";
import { useRef } from "react";
import AreaSheetContent from "./AreaSheetContent";
import FloorSheetContent from "./FloorSheetContent";

export default function FloorBottomSheet() {
    const mainSheetRef = useRef<TrueSheet>(null);
    const subSheetRef = useRef<TrueSheet>(null);
    const { setShowAreaSheet } = useMyStoreV2();

    async function dismissAreaSheet() {
        setShowAreaSheet(false);
        await mainSheetRef.current?.present();
    }

    return (
        <>
            <TrueSheet
                name="main-sheet"
                ref={mainSheetRef}
                sizes={['11%', '43%', 'large']}
                initialIndex={0}
                initialIndexAnimated
                dismissible={false}
                dimmed={false}
                cornerRadius={24}
                contentContainerStyle={styles.sheet}
            >
                <FloorSheetContent />
                <TrueSheet
                    name="sub-sheet"
                    ref={subSheetRef}
                    sizes={['28%', '43%', 'large']}
                    dimmed={false}
                    cornerRadius={24}
                    contentContainerStyle={styles.sheet}
                    onDismiss={dismissAreaSheet}
                >
                    <AreaSheetContent />
                </TrueSheet>
            </TrueSheet>
        </>
    );
}

const styles = StyleSheet.create({
    sheet: {
        padding: 20,
        marginBottom: 25,
    },
});