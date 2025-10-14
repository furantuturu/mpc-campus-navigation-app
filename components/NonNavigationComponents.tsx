import ActivateUserLocation from "@/components/fab/ActivateUserLocation";
import CampusCategoryButton from "@/components/fab/CampusCategoryButton";
import FloorsSelectionPerCategoryModal from "@/components/fab/FloorsSelectionPerCategoryModal";
import MapDimensionToggle from "@/components/fab/MapDimensionToggle";
import AreaSearchBar from "@/components/fab/SearchAreaModal";
import AreaSheetContent from "./bottom-sheet-components/AreaSheetContent";
import BottomSheetToggle from "./fab/BottomSheetToggle";

export default function NonNavigationComponents() {
    return (
        <>
            <ActivateUserLocation />
            <AreaSearchBar />
            <CampusCategoryButton />
            <MapDimensionToggle />
            <FloorsSelectionPerCategoryModal />
            <BottomSheetToggle />
            <AreaSheetContent />
        </>
    );
}