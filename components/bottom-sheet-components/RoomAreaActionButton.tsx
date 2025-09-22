import { customRed, customRedButton, roomBuildingNamesPerFloor, roomData } from "@/constants/floorData";
import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData, Building } from "@/types/types";
import { FlashList } from '@shopify/flash-list/src';
import { map } from "es-toolkit/compat";
import { StyleSheet, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";

import CustomButton from "./CustomButton";

export default function RoomAreaActionButtons() {
    const { selectedCategory, selectedFloor } = useMyStoreV2();

    const buldingRoomData: Building = roomData[selectedFloor];
    const buldingNameRoomData = roomBuildingNamesPerFloor[selectedFloor];

    function renderRoomAreaButtons({ item }: { item: string; }) {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleStyle} variant="titleMedium">{item}</Text>
                        <Icon source="google-classroom" color={customRed} size={25} />
                    </View>
                    <View style={styles.listContainer}>
                        {map(buldingRoomData[item], (roomArea: AreaData) => {
                            return (
                                <CustomButton
                                    key={roomArea.id}
                                    areaData={roomArea}
                                    buttonColor={customRedButton}
                                />
                            );
                        })
                        }
                    </View>
                </View>
                <Divider />
            </>
        );
    }

    return (
        <View>
            <FlashList
                data={buldingNameRoomData}
                renderItem={renderRoomAreaButtons}
                keyExtractor={item => `${selectedCategory}-${item}-${selectedFloor}`}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBlock: 20,
    },
    chipStyle: {
        margin: 5
    },
    titleView: {
        flexDirection: 'row',
        gap: 8
    },
    titleStyle: {
        marginBottom: 10
    },
    listContainer: {
        flexDirection: "row",
        flexWrap: 'wrap'
    },

});