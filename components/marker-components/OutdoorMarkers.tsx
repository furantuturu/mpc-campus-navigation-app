import { outdoorData } from "@/constants/floorData";
import { canteenMarkerImg, gymMarkerImg, swimmingMarkerImg } from "@/constants/markerConfig";
import { isEqual } from "es-toolkit";
import { map } from "es-toolkit/compat";
import MemoMapMarker from "./MapMarker";

export default function OutdoorMarkers() {
    return (
        map(outdoorData, (outdoorData) => {
            const markerImg = isEqual(outdoorData.name, "Gym") ? gymMarkerImg : isEqual(outdoorData.name, "Gym") ? canteenMarkerImg : swimmingMarkerImg;

            return (
                <MemoMapMarker
                    key={outdoorData.id}
                    areaData={outdoorData}
                    markerImg={markerImg}
                />
            );
        })
    );
}