import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { StyleSheet } from "react-native";

//* Components
import AreaSheetContent from "./AreaSheetContent";
import FloorSheetContent from "./FloorSheetContent";

export default function FloorBottomSheet() {

    return (
        <>
            <TrueSheet
                name="main-sheet"
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
                    sizes={['25%', '43%', 'large']}
                    dismissible={false}
                    dimmed={false}
                    cornerRadius={24}
                    contentContainerStyle={styles.sheet}
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
        marginBottom: 25
    }
});