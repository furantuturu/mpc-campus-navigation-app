import { outdoorData } from "@/constants/floorData";
import { canteenMarkerImg, gymMarkerImg, swimmingMarkerImg } from "@/constants/markerConfig";
import MemoMapMarker from "./MapMarker";

export default function OutdoorMarkers() {
    return (
        outdoorData.map((outdoorMarker) => {
            const markerImg = outdoorMarker.name === "Gym" ? gymMarkerImg : outdoorMarker.name === "Canteen" ? canteenMarkerImg : swimmingMarkerImg;

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