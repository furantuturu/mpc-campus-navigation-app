import { initAnchor } from "@/constants/markerConfig";
import { AreaData } from "@/types/types";
import { MarkerView } from "@maplibre/maplibre-react-native";
import { memo } from "react";
import AreaMarkerImg from "./AreaMarkerImg";

interface AreaMapMarkerProps {
    areaData: AreaData;
    markerImg: any;
};

function AreaMapMarker({ areaData, markerImg }: AreaMapMarkerProps) {
    const coords = [areaData.coordinates.longitude, areaData.coordinates.latitude];

    return (
        <MarkerView id={areaData.id} coordinate={coords} anchor={initAnchor} allowOverlap={true}>
            <AreaMarkerImg markerAreaData={areaData} image={markerImg} />
        </MarkerView>
    );
}

const MemoAreaMapMarker = memo(AreaMapMarker);
export default MemoAreaMapMarker;
