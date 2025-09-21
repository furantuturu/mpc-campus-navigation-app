import { customBlackButton, outdoorData } from "@/constants/floorData";
import { AreaData } from "@/types/types";
import { StyleSheet, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import CustomButton from "./CustomButton";

export default function OutdoorAreaActionButtons() {

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleStyle} variant="titleMedium">Outdoor</Text>
                    <Icon source="home-group" size={25} />
                </View>
                <View style={styles.listContainer}>
                    {outdoorData.map((outdoorArea: AreaData) => {
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
        gap: 5
    },
    titleStyle: {
        marginBottom: 10
    },
    listContainer: {
        flexDirection: "row",
        flexWrap: 'wrap'
    }
});