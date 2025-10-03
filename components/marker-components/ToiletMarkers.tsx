import { toiletData } from "@/constants/floorData";
import { toiletMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { map } from "es-toolkit/compat";
import MemoMapMarker from "./MapMarker";

export default function ToiletMarkers() {
    const { selectedFloor } = useMyStoreV2();

    const floorToiletData = toiletData[selectedFloor];

    return (
        map(floorToiletData, (toiletData) => {
            return (
                <MemoMapMarker
                    key={toiletData.id}
                    areaData={toiletData}
                    markerImg={toiletMarkerImg}
                />
            );
        })
    );
}