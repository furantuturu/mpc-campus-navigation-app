import FloorBottomSheet from "@/components/bottom-sheet-components/MapBottomSheet";
import ActivateUserLocation from "@/components/fab/ActivateUserLocation";
import FloorsSelectionPerCategoryModal from "@/components/fab/FloorsSelectionPerCategoryModal";
import MapDimensionToggle from "@/components/fab/MapDimensionToggle";
import SchoolCategoryButton from "@/components/fab/SchoolCategoryButton";
import AreaSearchBar from "@/components/fab/SearchAreaModal";

export default function NonNavigationComponents() {
    return (
        <>
            <AreaSearchBar />
            <SchoolCategoryButton />
            <MapDimensionToggle />
            <FloorsSelectionPerCategoryModal />
            <ActivateUserLocation />
            <FloorBottomSheet />
        </>
    );
}