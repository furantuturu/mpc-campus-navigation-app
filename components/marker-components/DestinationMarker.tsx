import { canteenMarkerImg, gymMarkerImg, officeMarkerImg, roomMarkerImg, swimmingMarkerImg, toilerMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import MemoMapMarker from "./MapMarker";

export default function DestinationMarker() {
    const { areaData } = useMyStoreV2();

    let markerImg;
    switch (areaData.category) {
        case "Offices":
            markerImg = officeMarkerImg;
            break;
        case "Rooms":
            markerImg = roomMarkerImg;
            break;
        case "Toilets":
            markerImg = toilerMarkerImg;
            break;
        default:
            switch (areaData.name) {
                case "Gym":
                    markerImg = gymMarkerImg;
                    break;
                case "Canteen":
                    markerImg = canteenMarkerImg;
                default:
                    markerImg = swimmingMarkerImg;
                    break;
            }
            break;
    }

    return (
        <MemoMapMarker
            areaData={areaData}
            markerImg={markerImg}
        />
    );
}