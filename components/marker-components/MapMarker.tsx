import { MarkerView } from "@maplibre/maplibre-react-native";
import { memo } from "react";

//* Constants
import {
    initAnchor
} from "@/constants/markerConfig";
import { AreaData } from "@/types/types";
import MarkerImg from "./MarkerImg";

type MapMarkerProps = {
    areaData: AreaData;
    markerImg: any;
};

function MapMarker({ areaData, markerImg }: MapMarkerProps) {
    const coords = [areaData.coordinates.longitude, areaData.coordinates.latitude];

    return (
        <MarkerView id={areaData.id} coordinate={coords} anchor={initAnchor} allowOverlap={true}>
            <MarkerImg markerAreaData={areaData} image={markerImg} />
        </MarkerView>
    );
}

const MemoMapMarker = memo(MapMarker);
export default MemoMapMarker;
