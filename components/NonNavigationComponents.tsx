import ActivateUserLocation from "@/components/fab/ActivateUserLocation";
import CampusCategoryButton from "@/components/fab/CampusCategoryButton";
import FloorsSelectionPerCategoryModal from "@/components/fab/FloorsSelectionPerCategoryModal";
import MapDimensionToggle from "@/components/fab/MapDimensionToggle";
import AreaSearchBar from "@/components/fab/SearchAreaModal";

export default function NonNavigationComponents() {
    return (
        <>
            <ActivateUserLocation />
            <AreaSearchBar />
            <CampusCategoryButton />
            <MapDimensionToggle />
            <FloorsSelectionPerCategoryModal />
        </>
    );
}