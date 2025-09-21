import { customBlueButton, officeBuildingNamesPerFloor, officeData } from "@/constants/floorData";
import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData, Building } from "@/types/types";
import { FlashList } from '@shopify/flash-list/src';
import { StyleSheet, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import CustomButton from "./CustomButton";

export default function OfficeAreaActionButtons() {
    const { selectedCategory, selectedFloor } = useMyStoreV2();

    if (selectedFloor === "F2") return null;

    const buldingOfficeData: Building = officeData[selectedFloor];
    const buldingNameOfficeData = officeBuildingNamesPerFloor[selectedFloor];

    function renderOfficeAreaButtons({ item }: { item: string; }) {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleStyle} variant="titleMedium">{item}</Text>
                        <Icon source="office-building" size={25} />
                    </View>
                    <View style={styles.listContainer}>
                        {buldingOfficeData[item].map((officeArea: AreaData) => {
                            return (
                                <CustomButton
                                    key={officeArea.id}
                                    areaData={officeArea}
                                    buttonColor={customBlueButton}
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
                data={buldingNameOfficeData}
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
        gap: 5
    },
    titleStyle: {
        marginBottom: 10
    },
    listContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
});