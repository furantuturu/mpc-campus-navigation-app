import { outdoorData } from "@/constants/floorData";
import { canteenMarkerImg, gymMarkerImg, swimmingMarkerImg } from "@/constants/markerConfig";
import { isEqual } from "es-toolkit";
import { map } from "es-toolkit/compat";
import MemoMapMarker from "./MapMarker";

export default function OutdoorMarkers() {
    return (
        map(outdoorData, (outdoorMarker) => {
            const markerImg = isEqual(outdoorMarker.name, "Gym") ? gymMarkerImg : isEqual(outdoorMarker.name, "Gym") ? canteenMarkerImg : swimmingMarkerImg;

            return (
                <MemoMapMarker
                    key={outdoorMarker.id}
                    coordinateLat={outdoorMarker.coordinates.latitude}
                    coordinateLng={outdoorMarker.coordinates.longitude}
                    markerImg={markerImg}
                />
            );
        })
    );
}