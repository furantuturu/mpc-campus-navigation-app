import { canteenMarkerImg, gymMarkerImg, officeMarkerImg, roomMarkerImg, swimmingMarkerImg, toiletMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { isEqual } from "es-toolkit";
import MemoMapMarker from "./MapMarker";

const categoryMarkerImg: any = {
    "Offices": officeMarkerImg,
    "Rooms": roomMarkerImg,
    "Toilets": toiletMarkerImg
};
const outDoorsMarkerImg: any = {
    "Gym": gymMarkerImg,
    "Canteen": canteenMarkerImg,
    "Swimming Area": swimmingMarkerImg
};
export default function DestinationMarker() {
    const { areaData } = useMyStoreV2();

    let markerImg;
    if (isEqual(areaData.category, "Outdoors")) {
        markerImg = outDoorsMarkerImg[areaData.name];
    } else {
        markerImg = categoryMarkerImg[areaData.category];
    }

    return (
        <MemoMapMarker
            areaData={areaData}
            markerImg={markerImg}
        />
    );
}