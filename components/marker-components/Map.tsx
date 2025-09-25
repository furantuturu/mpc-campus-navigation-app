import { initAnchor } from "@/constants/markerConfig";
import { MapView, MarkerView } from "@maplibre/maplibre-react-native";
import { Image } from 'expo-image';
import { StyleSheet } from "react-native";

//* Components
import GeneralMapSetup from "@/components/GeneralMapSetup";
import SchoolCategoryMarkers from "@/components/marker-components/SchoolCategoryMarkers";
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
            <MarkerView coordinate={[125.145323, 6.117693,]} anchor={initAnchor}>
                <Image source={require("@/assets/images/userMock.png")} style={{ width: 25, height: 25 }} />
            </MarkerView>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
});
