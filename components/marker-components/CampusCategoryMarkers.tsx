import { useMyStoreV2 } from "@/store/useMyStore";
import { isEqual } from "es-toolkit";
import OfficeMarkers from "./OfficeMarkers";
import OutdoorMarkers from "./OutdoorMarkers";
import RoomMarkers from "./RoomMarkers";
import ToiletMarkers from "./ToiletMarkers";

export default function CampusCategoryMarkers() {
    const { selectedCategory } = useMyStoreV2();

    return (
        <>
            {isEqual(selectedCategory, "Offices") && <OfficeMarkers />}
            {isEqual(selectedCategory, "Rooms") && <RoomMarkers />}
            {isEqual(selectedCategory, "Toilets") && <ToiletMarkers />}
            {isEqual(selectedCategory, "Outdoors") && <OutdoorMarkers />}
        </>
    );
}