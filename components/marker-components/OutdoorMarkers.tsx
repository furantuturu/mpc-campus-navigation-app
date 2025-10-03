import { outdoorData } from "@/constants/floorData";
import { canteenMarkerImg, gymMarkerImg, swimmingMarkerImg } from "@/constants/markerConfig";
import { map } from "es-toolkit/compat";
import MemoMapMarker from "./MapMarker";

const outDoorsMarkerImg: any = {
    "Gym": gymMarkerImg,
    "Canteen": canteenMarkerImg,
    "Swimming Area": swimmingMarkerImg
};
export default function OutdoorMarkers() {
    return (
        map(outdoorData, (outdoorData) => {
            const markerImg = outDoorsMarkerImg[outdoorData.name];

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