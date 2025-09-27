import { officeBuildingNamesPerFloor, officeData } from "@/constants/floorData";
import { officeMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Building } from "@/types/types";
import { map } from "es-toolkit/compat";
import MemoMapMarker from "./MapMarker";

export default function OfficeMarkers() {
    const { selectedFloor } = useMyStoreV2();

    if (selectedFloor === "2F") return null;

    const buldingOfficeData: Building = officeData[selectedFloor];
    const buldingNameOfficeData = officeBuildingNamesPerFloor[selectedFloor];

    return (
        map(buldingNameOfficeData, officeBuildingName => {
            return map(buldingOfficeData[officeBuildingName], (officeData) => {
                return (
                    <MemoMapMarker
                        key={officeData.id}
                        areaData={officeData}
                        markerImg={officeMarkerImg}
                    />
                );
            });
        })
    );
}