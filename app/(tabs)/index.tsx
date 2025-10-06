import CameraMapSetup from "@/components/CameraMapSetup";
import CampusBaseMap from "@/components/CampusBaseMap";
import MapDimensionToggle from "@/components/fab/MapDimensionToggle";
import ExploreMarkers from "@/components/marker-components/ExploreMarkers";
import { MapView } from "@maplibre/maplibre-react-native";
import { StyleSheet, View } from "react-native";

export default function Index() {

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                attributionEnabled={false}
                compassEnabled={false}
            >
                <CampusBaseMap />
                <CameraMapSetup />
                <ExploreMarkers />
            </MapView>
            <MapDimensionToggle />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        position: 'relative'
    },
    map: {
        flex: 1
    },
});