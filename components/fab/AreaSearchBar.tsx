import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AreaSearchBar() {
    const [searchQuery, setSearchQuery] = useState('');

    //TODO do the search in a view not floating
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBarView}>
                <TextInput
                    style={styles.searchBar}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        width: "100%"

    },
    searchBarView: {
        marginInline: 20
    },
    searchBar: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white"
    }
});