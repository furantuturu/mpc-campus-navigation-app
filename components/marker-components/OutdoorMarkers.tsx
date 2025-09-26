import { outdoorData } from "@/constants/floorData";
import { canteenMarkerImg, gymMarkerImg, swimmingMarkerImg } from "@/constants/markerConfig";
import { map } from "es-toolkit/compat";
import MemoMapMarker from "./MapMarker";

export default function OutdoorMarkers() {
    return (
        map(outdoorData, (outdoorData) => {
            let markerImg: any;
            switch (outdoorData.name) {
                case "Gym":
                    markerImg = gymMarkerImg;
                    break;
                case "Canteen":
                    markerImg = canteenMarkerImg;
                    break;
                default:
                    markerImg = swimmingMarkerImg;
                    break;
            }

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