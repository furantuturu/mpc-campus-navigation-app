import { useUserLocStore } from "@/store/useMyStore";
import { MapView } from "@maplibre/maplibre-react-native";
import { StyleSheet } from "react-native";

//* Components
import CameraMapSetup from "@/components/CameraMapSetup";
import SchoolCategoryMarkers from "@/components/marker-components/SchoolCategoryMarkers";
import BuildingMarkers from "./marker-components/BuildingMarkers";
import DestinationMarker from "./marker-components/DestinationMarker";
import RouteLinePath from "./marker-components/RouteLinePath";
import StairsMarkers from "./marker-components/StairsMarkers";
import SchoolBaseMap from "./SchoolBaseMap";
import ShowUserLocation from "./ShowUserLocation";

export default function Map() {
    const { isNavigating } = useUserLocStore();

    return (
        <MapView
            style={styles.map}
            attributionEnabled={false}
            compassEnabled={false}
        >
            <SchoolBaseMap />
            <CameraMapSetup />
            <BuildingMarkers />
            <StairsMarkers />
            {isNavigating
                ? <DestinationMarker />
                : <SchoolCategoryMarkers />
            }
            <RouteLinePath />
            <ShowUserLocation />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
});
