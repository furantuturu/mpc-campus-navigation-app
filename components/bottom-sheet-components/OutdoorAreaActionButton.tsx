import { customBlack, customBlackButton, outdoorData } from "@/constants/floorData";
import { AreaData } from "@/types/types";
import { map } from "es-toolkit/compat";
import { StyleSheet, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";

import CustomButton from "./CustomButton";

export default function OutdoorAreaActionButtons() {

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleStyle} variant="titleMedium">Outdoor</Text>
                    <Icon source="home-group" color={customBlack} size={25} />
                </View>
                <View style={styles.listContainer}>
                    {map(outdoorData, (outdoorArea: AreaData) => {
                        return (
                            <CustomButton
                                key={outdoorArea.id}
                                areaData={outdoorArea}
                                buttonColor={customBlackButton}
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
    }
});