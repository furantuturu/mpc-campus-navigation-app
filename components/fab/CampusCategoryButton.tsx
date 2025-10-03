import { customBlack, customBlue, customDarkYellow, customRed, customYellow } from "@/constants/floorData";
import { categorySelect } from "@/constants/helpers/helper";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Category } from "@/types/types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CampusCategoryButton() {
    const { activeCategory, setSelectedCategory, setActiveCategory, setRoutePath, setShowAreaSheet, showAreaSheet } = useMyStoreV2();

    async function selectActiveCategory(category: Category) {
        setRoutePath(null);
        categorySelect(category, setSelectedCategory, setActiveCategory);
        if (showAreaSheet) {
            await TrueSheet.dismiss("sub-sheet");
            await TrueSheet.present("main-sheet");
            setShowAreaSheet(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollViewStyles}
            >
                <Button
                    style={styles.buttonStyles}
                    labelStyle={styles.textStyles}
                    mode={activeCategory.Offices ? "contained" : "elevated"}
                    textColor={activeCategory.Offices ? "white" : customBlue}
                    buttonColor={activeCategory.Offices ? customBlue : "white"}
                    icon="office-building"
                    onPress={() => selectActiveCategory("Offices")}
                >
                    Offices
                </Button>
                <Button
                    style={styles.buttonStyles}
                    labelStyle={styles.textStyles}
                    mode={activeCategory.Rooms ? "contained" : "elevated"}
                    textColor={activeCategory.Rooms ? "white" : customRed}
                    buttonColor={activeCategory.Rooms ? customRed : "white"}
                    icon="google-classroom"
                    onPress={() => selectActiveCategory("Rooms")}
                >
                    Rooms
                </Button>
                <Button
                    style={styles.buttonStyles}
                    labelStyle={styles.textStyles}
                    mode={activeCategory.Toilets ? "contained" : "elevated"}
                    textColor={activeCategory.Toilets ? "white" : customDarkYellow}
                    buttonColor={activeCategory.Toilets ? customYellow : "white"}
                    icon="toilet"
                    onPress={() => selectActiveCategory("Toilets")}
                >
                    Toilets
                </Button>
                <Button
                    labelStyle={styles.textStyles}
                    mode={activeCategory.Outdoors ? "contained" : "elevated"}
                    textColor={activeCategory.Outdoors ? "white" : customBlack}
                    buttonColor={activeCategory.Outdoors ? customBlack : "white"}
                    icon="home-group"
                    onPress={() => selectActiveCategory("Outdoors")}
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