import { roomBuildingNamesPerFloor, roomData } from "@/constants/floorData";
import { roomMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Building } from "@/types/types";
import { map } from "es-toolkit/compat";
import MemoMapMarker from "./MapMarker";

export default function RoomMarkers() {
    const { selectedFloor } = useMyStoreV2();

    const buldingRoomData: Building = roomData[selectedFloor];
    const buldingNameRoomData = roomBuildingNamesPerFloor[selectedFloor];

    return (
        map(buldingNameRoomData, roomBuildingName => {
            return map(buldingRoomData[roomBuildingName], (roomData) => {
                return (
                    <MemoMapMarker
                        key={roomData.id}
                        areaData={roomData}
                        markerImg={roomMarkerImg}
                    />
                );
            });
        })
    );
}