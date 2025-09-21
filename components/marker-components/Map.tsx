import { MapView } from "@maplibre/maplibre-react-native";

//* Components
import GeneralMapSetup from "@/components/GeneralMapSetup";
import SchoolCategoryMarkers from "@/components/marker-components/SchoolCategoryMarkers";
import { StyleSheet } from "react-native";
import BuildingMarkers from "./BuildingMarkers";

const INIT_TILE_URL = "https://api.maptiler.com/maps/satellite/style.json?key=fdSU29XQAXY9nIuYyqZ4";

export default function Map() {

    return (
        <MapView
            style={styles.map}
            attributionEnabled={false}
            compassViewPosition={3}
            compassViewMargins={{ x: 0, y: 150 }}
            mapStyle={INIT_TILE_URL}
            regionWillChangeDebounceTime={200}
        >
            <GeneralMapSetup />
            <BuildingMarkers />
            <SchoolCategoryMarkers />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
});
