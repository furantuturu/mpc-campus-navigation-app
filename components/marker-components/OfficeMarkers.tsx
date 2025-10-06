import { officeBuildingNamesPerFloor, officeData } from "@/constants/floorData";
import { officeMarkerImg } from "@/constants/markerConfig";
import { useMyStoreV2 } from "@/store/useMyStore";
import { Building } from "@/types/types";
import { map } from "es-toolkit/compat";
import MemoAreaMapMarker from "./AreaMapMarker";

export default function OfficeMarkers() {
    const { selectedFloor } = useMyStoreV2();

    if (selectedFloor === "2F") return null;

    const buldingOfficeData: Building = officeData[selectedFloor];
    const buldingNameOfficeData = officeBuildingNamesPerFloor[selectedFloor];

    return (
        map(buldingNameOfficeData, officeBuildingName => {
            return map(buldingOfficeData[officeBuildingName], (officeData) => {
                return (
                    <MemoAreaMapMarker
                        key={officeData.id}
                        areaData={officeData}
                        markerImg={officeMarkerImg}
                    />
                );
            });
        })
    );
}