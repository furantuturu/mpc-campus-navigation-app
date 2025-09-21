import { roomBuildingNamesPerFloor, roomData } from "@/constants/floorData";
import { roomMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Building } from "@/types/types";
import MemoMapMarker from "./MapMarker";

export default function RoomMarkers() {
    const { selectedFloor } = useMyStoreV2();

    const buldingRoomData: Building = roomData[selectedFloor];
    const buldingNameRoomData = roomBuildingNamesPerFloor[selectedFloor];

    return (
        buldingNameRoomData.map(roomBuildingName => {
            return buldingRoomData[roomBuildingName].map((roomMarker) => {
                return (
                    <MemoMapMarker
                        key={roomMarker.id}
                        coordinateLat={roomMarker.coordinates.latitude}
                        coordinateLng={roomMarker.coordinates.longitude}
                        markerImg={roomMarkerImg}
                    />
                );
            });
        })
    );
}