import { customBlue, customBlueButton, officeBuildingNamesPerFloor, officeData } from "@/constants/floorData";
import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData, Building } from "@/types/types";
import { FlashList } from '@shopify/flash-list/src';
import { map } from "es-toolkit/compat";
import { StyleSheet, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import CustomButton from "./CustomButton";

export default function OfficeAreaActionButtons() {
    const { selectedCategory, selectedFloor } = useMyStoreV2();

    if (selectedFloor === "2F") return null;

    const buildingOfficeData: Building = officeData[selectedFloor];
    const buildingNameOfficeData = officeBuildingNamesPerFloor[selectedFloor];

    function renderOfficeAreaButtons({ item }: { item: string; }) {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleStyle} variant="titleMedium">{item}</Text>
                        <Icon source="office-building" color={customBlue} size={25} />
                    </View>
                    <View style={styles.listContainer}>
                        {map(buildingOfficeData[item], (officeArea: AreaData) => {
                            return (
                                <CustomButton
                                    key={officeArea.id}
                                    areaData={officeArea}
                                    buttonColor={customBlueButton}
                                />
                            );
                        })}
                    </View>
                </View>
                <Divider />
            </>
        );
    }

    return (
        <View>
            <FlashList
                data={buildingNameOfficeData}
                renderItem={renderOfficeAreaButtons}
                keyExtractor={item => `${selectedCategory}-${item}-${selectedFloor}`}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBlock: 20,
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
        flexWrap: "wrap"
    }
});