import { initAnchor } from "@/constants/markerConfig";
import { MapView, MarkerView } from "@maplibre/maplibre-react-native";
import { Image } from 'expo-image';
import { StyleSheet } from "react-native";

//* Components
import GeneralMapSetup from "@/components/GeneralMapSetup";
import SchoolCategoryMarkers from "@/components/marker-components/SchoolCategoryMarkers";
import BuildingMarkers from "./BuildingMarkers";
import GoogleBaseMap from "./GoogleBaseMap";
import RouteLinePath from "./RouteLinePath";

export default function Map() {

    return (
        <MapView
            style={styles.map}
            attributionEnabled={false}
            compassViewPosition={3}
            compassViewMargins={{ x: 0, y: 150 }}
            regionWillChangeDebounceTime={200}
        >
            <GoogleBaseMap />
            <GeneralMapSetup />
            <BuildingMarkers />
            <SchoolCategoryMarkers />
            <MarkerView coordinate={[125.145323, 6.117693]} anchor={initAnchor}>
                <Image source={require("@/assets/images/userMock.png")} style={{ width: 25, height: 25 }} />
            </MarkerView>

            <RouteLinePath />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
});
