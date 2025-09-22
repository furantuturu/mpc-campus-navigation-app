import { toiletData } from "@/constants/floorData";
import { toilerMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { map } from "es-toolkit/compat";
import MemoMapMarker from "./MapMarker";

export default function ToiletMarkers() {
    const { selectedFloor } = useMyStoreV2();

    const floorToiletData = toiletData[selectedFloor];

    return (
        map(floorToiletData, (toiletMarker) => {
            return (
                <MemoMapMarker
                    key={toiletMarker.id}
                    coordinateLat={toiletMarker.coordinates.latitude}
                    coordinateLng={toiletMarker.coordinates.longitude}
                    markerImg={toilerMarkerImg}
                />
            );
        })
    );
}