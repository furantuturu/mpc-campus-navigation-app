import { customBlack, customBlue, customDarkYellow, customRed, customYellow } from "@/constants/floorData";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Category } from "@/types/types";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SchoolCategoryButton() {
    const { setSelectedCategory } = useMyStoreV2();
    const [active, setActive] = useState({
        Offices: true,
        Rooms: false,
        Toilets: false,
        Outdoors: false,
    });

    function categorySelect(category: Category) {
        const activeFalse = {
            Offices: false,
            Rooms: false,
            Toilets: false,
            Outdoors: false,
        };

        setActive((prevState) => {
            return { ...activeFalse, [category]: true };
        });

        setSelectedCategory(category);
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
                    mode={active.Offices ? "contained" : "elevated"}
                    textColor={active.Offices ? "white" : customBlue}
                    buttonColor={active.Offices ? customBlue : "white"}
                    icon="office-building"
                    onPress={() => categorySelect("Offices")}
                >
                    Offices
                </Button>
                <Button
                    style={styles.buttonStyles}
                    labelStyle={styles.textStyles}
                    mode={active.Rooms ? "contained" : "elevated"}
                    textColor={active.Rooms ? "white" : customRed}
                    buttonColor={active.Rooms ? customRed : "white"}
                    icon="google-classroom"
                    onPress={() => categorySelect("Rooms")}
                >
                    Rooms
                </Button>
                <Button
                    style={styles.buttonStyles}
                    labelStyle={styles.textStyles}
                    mode={active.Toilets ? "contained" : "elevated"}
                    textColor={active.Toilets ? "white" : customDarkYellow}
                    buttonColor={active.Toilets ? customYellow : "white"}
                    icon="toilet"
                    onPress={() => categorySelect("Toilets")}
                >
                    Toilets
                </Button>
                <Button
                    labelStyle={styles.textStyles}
                    mode={active.Outdoors ? "contained" : "elevated"}
                    textColor={active.Outdoors ? "white" : customBlack}
                    buttonColor={active.Outdoors ? customBlack : "white"}
                    icon="home-group"
                    onPress={() => categorySelect("Outdoors")}
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