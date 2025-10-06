import { categoryMarkerImg, outDoorsMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { isEqual } from "es-toolkit";
import MemoAreaMapMarker from "./AreaMapMarker";

export default function DestinationMarker() {
    const { areaData } = useMyStoreV2();

    let markerImg;
    if (isEqual(areaData.category, "Outdoors")) {
        markerImg = outDoorsMarkerImg[areaData.name];
    } else {
        markerImg = categoryMarkerImg[areaData.category];
    }

    return (
        <MemoAreaMapMarker
            areaData={areaData}
            markerImg={markerImg}
        />
    );
}