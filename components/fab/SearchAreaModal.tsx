import { customBlack, customBlue, customDarkYellow, customRed, schoolDataForSearch } from "@/constants/floorData";
import { areaDetailsSheet, contains } from "@/constants/helpers/helper";
import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData } from "@/types/types";
import { isEqual, trim } from "es-toolkit";
import { filter, toLower } from "es-toolkit/compat";
import { useState } from "react";
import { FlatList, Modal, ScrollView, StyleSheet, View } from "react-native";
import { Button, Divider, Icon, Searchbar, Text, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AreaSearchBar() {
    const { setShowAreaSheet, setAreaData } = useMyStoreV2();

    const [visible, setVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSchoolData, setFilteredSchoolData] = useState<AreaData[]>([]);

    function openMenu() {
        setVisible(true);
    }

    function closeMenu() {
        setVisible(false);
    }

    function searchArea(query: string) {
        setSearchQuery(query);

        const formattedQuery = toLower(trim(query));
        const filteredData = filter(schoolDataForSearch, (area: AreaData) => {
            return contains(area, formattedQuery);
        });

        setFilteredSchoolData(filteredData);
    }

    //TODO switch category and floor active button as well
    async function listPress(areaData: AreaData) {
        areaDetailsSheet(areaData, setAreaData, setShowAreaSheet);
        closeMenu();
    }

    function renderAreaList({ item }: { item: AreaData; }) {
        const icon = isEqual(item.category, "Offices") ? "office-building" : isEqual(item.category, "Rooms") ? "google-classroom" : isEqual(item.category, "Toilets") ? "toilet" : "home-group";
        const iconColor = isEqual(item.category, "Offices") ? customBlue : isEqual(item.category, "Rooms") ? customRed : isEqual(item.category, "Toilets") ? customDarkYellow : customBlack;

        return (
            <TouchableRipple
                borderless
                rippleColor="rgba(0, 0, 0, 0.12)"
                onPress={() => listPress(item)}
            >
                <View style={styles.areaTextStyles}>
                    <Icon source={icon} color={iconColor} size={25} />
                    <Text variant="titleMedium">{item.name}</Text>
                </View>
            </TouchableRipple>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                visible={visible}
                onRequestClose={closeMenu}
            >
                <View style={styles.modalContainer}>
                    <Searchbar
                        style={styles.searchBarStyle}
                        icon="home-search"
                        placeholder="Search Area (ex. office, f1, room102)"
                        value={searchQuery}
                        onChangeText={(query) => searchArea(query)}
                        elevation={3}
                        autoFocus={true}
                    />
                </View>
                <Divider />
                <View style={styles.areaListStyles}>
                    <Text variant="labelLarge">Results:</Text>
                    <View style={styles.areaListContainer}>
                        {trim(searchQuery).length > 0 && (
                            <FlatList
                                data={filteredSchoolData}
                                renderItem={renderAreaList}
                                keyExtractor={item => item.id}

                            />
                        )}
                    </View>
                </View>
            </Modal>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollViewStyles}
            >
                <Button
                    style={styles.buttonStyles}
                    labelStyle={styles.textStyles}
                    mode="elevated"
                    textColor="#222"
                    buttonColor="white"
                    icon="home-search"
                    onPress={openMenu}
                >
                    Search Area
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 80,
        pointerEvents: 'box-none'
    },
    scrollViewStyles: {
        marginInline: 15
    },
    textStyles: {
        fontWeight: 'bold',
    },
    buttonStyles: {
        marginRight: 5,
    },
    modalContainer: {
        padding: 20
    },
    searchBarStyle: {
        backgroundColor: "white"
    },
    areaListContainer: {
        marginBlockEnd: 50
    },
    areaListStyles: {
        paddingHorizontal: 20,
        paddingBlock: 15
    },
    areaTextStyles: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 5,
        gap: 20
    }
});