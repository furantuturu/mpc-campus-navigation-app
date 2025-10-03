import { floorsPerCategory } from "@/constants/floorData";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Floor } from "@/types/types";
import { map, size } from "es-toolkit/compat";
import { useState } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Icon, Menu, Text, TouchableRipple } from 'react-native-paper';

const floorName: any = {
    "1F": "1st Floor / Ground",
    "2F": "2nd Floor",
    "3F": "3rd Floor",
    "4F": "4th Floor"
};
export default function FloorsSelectionPerCategoryModal() {
    const { selectedCategory, selectedFloor, setSelectedFloor, showAreaSheet, setRoutePath } = useMyStoreV2();
    const [visible, setVisible] = useState(false);

    const categoryFloors: Floor[] = floorsPerCategory[selectedCategory];

    if (size(categoryFloors) <= 1 || showAreaSheet) return null;

    function openMenu() {
        setVisible(true);
    }

    function closeMenu() {
        setVisible(false);
    }

    function selectFloor(floor: Floor) {
        closeMenu();
        setRoutePath(null);
        setSelectedFloor(floor);
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                visible={visible}
                onRequestClose={closeMenu}
                backdropColor={"#00000080"}
            >
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={styles.modalCenterView}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <View style={styles.modalTitleView}>
                                    <Text style={styles.modalTitle} variant="titleMedium">
                                        Select Floor Level
                                    </Text>
                                    <Icon source="office-building" size={25} />
                                </View>
                                <View style={styles.divider}></View>
                                {size(categoryFloors) > 1 && (
                                    map(categoryFloors, (floor) => {
                                        const selectedFloorName = floorName[floor];

                                        return (
                                            <Menu.Item
                                                key={`${selectedCategory}-${floor}`}
                                                leadingIcon="office-building-marker"
                                                title={selectedFloorName}
                                                onPress={() => selectFloor(floor)}
                                            />
                                        );
                                    }))}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <TouchableRipple style={styles.button} borderless onPress={openMenu}>
                <Text style={styles.text}>{selectedFloor}</Text>
            </TouchableRipple>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 9999,
        backgroundColor: "white",
        zIndex: 1,
        position: "absolute",
        top: 310,
        right: 10,
        width: 50,
        height: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    text: {
        fontWeight: "bold",
    },
    menu: {
        marginTop: 50,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 9999,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    modalCenterView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        padding: 20
    },
    modalTitleView: {
        flexDirection: 'row',
        gap: 10
    },
    modalTitle: {
        marginBottom: 20,
    },
    divider: {
        position: 'absolute',
        width: 180,
        top: 47,
        backgroundColor: "#ccc",
        height: 1,
        marginVertical: 10
    },
});