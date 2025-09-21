import { useMyStoreV2 } from "@/store/useMyStore";
import OfficeMarkers from "./OfficeMarkers";
import OutdoorMarkers from "./OutdoorMarkers";
import RoomMarkers from "./RoomMarkers";
import ToiletMarkers from "./ToiletMarkers";

export default function SchoolCategoryMarkers() {
    const { selectedCategory } = useMyStoreV2();

    return (
        <>
            {selectedCategory === "Offices" && <OfficeMarkers />}
            {selectedCategory === "Rooms" && <RoomMarkers />}
            {selectedCategory === "Toilets" && <ToiletMarkers />}
            {selectedCategory === "Outdoors" && <OutdoorMarkers />}
        </>
    );
}