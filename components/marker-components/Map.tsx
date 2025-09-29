import { MapView } from "@maplibre/maplibre-react-native";
import { StyleSheet } from "react-native";

//* Components
import GeneralMapSetup from "@/components/GeneralMapSetup";
import SchoolCategoryMarkers from "@/components/marker-components/SchoolCategoryMarkers";
import BuildingMarkers from "./BuildingMarkers";
import RouteLinePath from "./RouteLinePath";
import StairsMarkers from "./StairsMarkers";

export default function Map() {

    return (
        <MapView
            style={styles.map}
            attributionEnabled={false}
            compassViewPosition={3}
            compassViewMargins={{ x: 0, y: 150 }}
            regionWillChangeDebounceTime={200}
        >
            {/* <GoogleBaseMap /> */}
            <GeneralMapSetup />
            <BuildingMarkers />
            <StairsMarkers />
            <SchoolCategoryMarkers />
            <RouteLinePath />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
});
