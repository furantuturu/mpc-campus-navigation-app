import { customBlack, customBlue, customDarkYellow, customRed, schoolDataForSearch } from "@/constants/floorData";
import { areaDetailsSheet, categorySelect, contains } from "@/constants/helpers/helper";
import { useMyStoreV2 } from "@/store/useMyStore";
import { AreaData, Category, Floor } from "@/types/types";
import { sortBy, trim } from "es-toolkit";
import { filter, split, toLower } from "es-toolkit/compat";
import { useState } from "react";
import { FlatList, Modal, ScrollView, StyleSheet, View } from "react-native";
import { Button, Divider, Icon, Searchbar, Text, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AreaSearchBar() {
    const { showAreaSheet, setShowAreaSheet, setAreaData, setSelectedCategory, setSelectedFloor, setActiveCategory, setAreaCoordinates, setCameraFocus } = useMyStoreV2();

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

        const sortedFilteredData = sortBy(filteredData, ['name']);

        setFilteredSchoolData(sortedFilteredData);
    }

    async function listPress(areaData: AreaData) {
        closeMenu();
        if (showAreaSheet) {
            setAreaData(areaData);
        } else {
            await areaDetailsSheet(areaData, setAreaData, setShowAreaSheet);
        }

        await categorySelect(areaData.category as Category, setSelectedCategory, setActiveCategory);
        setSelectedFloor(trim(split(areaData.floor, "/")[1]) as Floor);
        setAreaCoordinates([areaData.coordinates.longitude, areaData.coordinates.latitude]);
        setCameraFocus(true);
    }

    function renderAreaList({ item }: { item: AreaData; }) {
        let icon: string;
        let iconColor: string;
        switch (item.category) {
            case "Offices":
                icon = "office-building";
                iconColor = customBlue;
                break;
            case "Rooms":
                icon = "google-classroom";
                iconColor = customRed;
                break;
            case "Toilets":
                icon = "toilet";
                iconColor = customDarkYellow;
                break;
            default:
                icon = "home-group";
                iconColor = customBlack;
                break;
        }

        return (
            <TouchableRipple
                borderless
                rippleColor="rgba(0, 0, 0, 0.12)"
                onPress={() => listPress(item)}
            >
                <View style={styles.areaTextContainer}>
                    <Icon source={icon} color={iconColor} size={25} />
                    <Text style={styles.areaTextStyles} variant="titleSmall">
                        {item.name}
                    </Text>
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
                        placeholder="Search Area, Floor, Category or Building Name"
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
    areaTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        padding: 15,
        marginVertical: 5,
        gap: 20,
    },
    areaTextStyles: {
        flexShrink: 1,
        lineHeight: 21
    }
});