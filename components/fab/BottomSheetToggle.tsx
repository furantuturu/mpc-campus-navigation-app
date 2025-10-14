import { useMyStoreV2 } from "@/store/useMyStore";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Icon, TouchableRipple } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomSheetToggle() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { showAreaSheet } = useMyStoreV2();

    if (showAreaSheet) return null;

    function openBottomSheet() {
        router.push("/bottom-sheet");
    }

    return (
        <TouchableRipple
            style={[styles.container, { bottom: insets.bottom + 10 }]}
            borderless
            rippleColor="rgba(0, 0, 0, 0.12)"
            onPress={openBottomSheet}
        >
            <Icon source="chevron-up" size={35} />
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 9999,
        backgroundColor: "white",
        position: "absolute",
        right: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: 50,
        height: 50,
        elevation: 5,
    }
});