import { customBlack, customBlue, customDarkYellow, customRed, customYellow } from "@/constants/floorData";
import { categorySelect } from "@/constants/helpers/helper";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Category } from "@/types/types";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SchoolCategoryButton() {
    const { activeCategory, setSelectedCategory, setActiveCategory, setRoutePath } = useMyStoreV2();

    function getButtonId(buttonId: string) {
        return document.getElementById(buttonId)!.id;
    }

    async function selectActiveCategory(category: Category, buttonId: string) {
        console.log(buttonId);
        setRoutePath(null);
        await categorySelect(category, setSelectedCategory, setActiveCategory);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollViewStyles}

            >
                <Button
                    id="office-btn"
                    style={styles.buttonStyles}
                    labelStyle={styles.textStyles}
                    mode={activeCategory.Offices ? "contained" : "elevated"}
                    textColor={activeCategory.Offices ? "white" : customBlue}
                    buttonColor={activeCategory.Offices ? customBlue : "white"}
                    icon="office-building"
                    onPress={() => selectActiveCategory("Offices", getButtonId("office-btn"))}
                >
                    Offices
                </Button>
                <Button
                    id="room-btn"
                    style={styles.buttonStyles}
                    labelStyle={styles.textStyles}
                    mode={activeCategory.Rooms ? "contained" : "elevated"}
                    textColor={activeCategory.Rooms ? "white" : customRed}
                    buttonColor={activeCategory.Rooms ? customRed : "white"}
                    icon="google-classroom"
                    onPress={() => selectActiveCategory("Rooms", getButtonId("room-btn"))}
                >
                    Rooms
                </Button>
                <Button
                    id="toilet-btn"
                    style={styles.buttonStyles}
                    labelStyle={styles.textStyles}
                    mode={activeCategory.Toilets ? "contained" : "elevated"}
                    textColor={activeCategory.Toilets ? "white" : customDarkYellow}
                    buttonColor={activeCategory.Toilets ? customYellow : "white"}
                    icon="toilet"
                    onPress={() => selectActiveCategory("Toilets", getButtonId("toilet-btn"))}
                >
                    Toilets
                </Button>
                <Button
                    id="outdoor-btn"
                    labelStyle={styles.textStyles}
                    mode={activeCategory.Outdoors ? "contained" : "elevated"}
                    textColor={activeCategory.Outdoors ? "white" : customBlack}
                    buttonColor={activeCategory.Outdoors ? customBlack : "white"}
                    icon="home-group"
                    onPress={() => selectActiveCategory("Outdoors", getButtonId("outdoor-btn"))}
                >
                    Outdoors
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        pointerEvents: 'box-none'
    },
    scrollViewStyles: {
        marginInline: 15,
    },
    textStyles: {
        fontWeight: 'bold',
    },
    buttonStyles: {
        marginRight: 5,
    }
});