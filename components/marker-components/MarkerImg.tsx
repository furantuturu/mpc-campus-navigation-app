import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

interface MarkerImgProps {
    image: any;
}

export default function MarkerImg({ image }: MarkerImgProps) {
    return (
        <View style={styles.outer}>
            <Image source={image} style={styles.marker} />
        </View>
    );
}

const styles = StyleSheet.create({
    marker: {
        width: 25,
        height: 32
    },
    outer: {
        alignItems: "center",
    }
});