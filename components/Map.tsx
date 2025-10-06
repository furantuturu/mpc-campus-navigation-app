import CameraMapSetup from "@/components/CameraMapSetup";
import CampusCategoryMarkers from "@/components/marker-components/CampusCategoryMarkers";
import { useUserLocStore } from "@/store/useMyStore";
import { MapView } from "@maplibre/maplibre-react-native";
import { StyleSheet } from "react-native";
import CampusBaseMap from "./CampusBaseMap";
import BuildingMarkers from "./marker-components/BuildingMarkers";
import DestinationMarker from "./marker-components/DestinationMarker";
import RouteLinePath from "./marker-components/RouteLinePath";
import StairsMarkers from "./marker-components/StairsMarkers";
import ShowUserLocation from "./ShowUserLocation";

export default function Map() {
    const { isNavigating, userFollowMode } = useUserLocStore();

    return (
        <MapView
            style={styles.map}
            attributionEnabled={false}
            compassEnabled={false}
            scrollEnabled={!userFollowMode}
        >
            <CampusBaseMap />
            <CameraMapSetup />
            <BuildingMarkers />
            <StairsMarkers />
            {isNavigating
                ? <DestinationMarker />
                : <CampusCategoryMarkers />
            }
            <RouteLinePath />
            <ShowUserLocation />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
