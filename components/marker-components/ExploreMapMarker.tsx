import { exploreAnchor } from "@/constants/markerConfig";
import { ExploreData } from "@/types/types";
import { MarkerView } from "@maplibre/maplibre-react-native";
import { memo } from "react";
import ExploreMarkerImg from "./ExploreMarkerImg";

interface ExploreMapMarkerProps {
    exploreData: ExploreData;
    markerImg: any;
};

function ExploreMapMarker({ exploreData, markerImg }: ExploreMapMarkerProps) {
    const coords = [exploreData.coordinates.longitude, exploreData.coordinates.latitude];

    return (
        <MarkerView id={exploreData.id} coordinate={coords} anchor={exploreAnchor} allowOverlap={true}>
            <ExploreMarkerImg markerExploreData={exploreData} image={markerImg} />
        </MarkerView>
    );
}

const MemoExploreMapMarker = memo(ExploreMapMarker);
export default MemoExploreMapMarker;