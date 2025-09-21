import { MarkerView } from "@maplibre/maplibre-react-native";
import { memo } from "react";

//* Constants
import {
    initAnchor
} from "@/constants/markerConfig";
import MarkerImg from "./MarkerImg";

type MapMarkerProps = {
    coordinateLng: number,
    coordinateLat: number;
    markerImg: any;
};

function MapMarker({ coordinateLng, coordinateLat, markerImg }: MapMarkerProps) {
    const coords = [coordinateLng, coordinateLat];

    return (
        <MarkerView coordinate={coords} anchor={initAnchor} allowOverlap={true}>
            <MarkerImg image={markerImg} />
        </MarkerView>
    );
}

const MemoMapMarker = memo(MapMarker);
export default MemoMapMarker;
