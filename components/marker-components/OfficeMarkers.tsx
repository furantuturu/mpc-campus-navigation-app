import { officeBuildingNamesPerFloor, officeData } from "@/constants/floorData";
import { officeMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Building } from "@/types/types";
import MemoMapMarker from "./MapMarker";

export default function OfficeMarkers() {
    const { selectedFloor } = useMyStoreV2();

    if (selectedFloor === "F2") return null;

    const buldingOfficeData: Building = officeData[selectedFloor];
    const buldingNameOfficeData = officeBuildingNamesPerFloor[selectedFloor];

    return (
        buldingNameOfficeData.map(officeBuildingName => {
            return buldingOfficeData[officeBuildingName].map((officeMarker) => {
                return (
                    <MemoMapMarker
                        key={officeMarker.id}
                        coordinateLat={officeMarker.coordinates.latitude}
                        coordinateLng={officeMarker.coordinates.longitude}
                        markerImg={officeMarkerImg}
                    />
                );
            });
        })
    );
}