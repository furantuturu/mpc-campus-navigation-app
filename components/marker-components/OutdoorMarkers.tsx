import { outdoorData } from "@/constants/floorData";
import { outDoorsMarkerImg } from "@/constants/markerConfig";
import { map } from "es-toolkit/compat";
import MemoAreaMapMarker from "./AreaMapMarker";

export default function OutdoorMarkers() {
    return (
        map(outdoorData, (outdoorData) => {
            const markerImg = outDoorsMarkerImg[outdoorData.name];

            return (
                <MemoAreaMapMarker
                    key={outdoorData.id}
                    areaData={outdoorData}
                    markerImg={markerImg}
                />
            );
        })
    );
}