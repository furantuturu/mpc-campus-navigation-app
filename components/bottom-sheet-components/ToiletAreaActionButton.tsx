import { customYellowButton, toiletData } from "@/constants/floorData";
import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData } from "@/types/types";
import { StyleSheet, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import CustomButton from "./CustomButton";

export default function ToiletAreaActionButtons() {
    const { selectedFloor } = useMyStoreV2();

    const toiletAreaPerFloor = toiletData[selectedFloor];

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleStyle} variant="titleMedium">Toilet ({selectedFloor})</Text>
                    <Icon source="toilet" size={25} />
                </View>
                <View style={styles.listContainer}>
                    {toiletAreaPerFloor.map((toiletArea: AreaData) => {
                        return (
                            <CustomButton
                                key={toiletArea.id}
                                areaData={toiletArea}
                                buttonColor={customYellowButton}
                            />
                        );
                    })}
                </View>
            </View>
            <Divider />
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
        gap: 5
    },
    titleStyle: {
        marginBottom: 10
    },
    listContainer: {
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    displayView: {
        display: 'none'
    }
});