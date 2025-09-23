import { ActiveCategory, AreaData, Category } from "@/types/types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { includes, toLower } from "es-toolkit/compat";

export function contains({ category, floor, building, name }: AreaData, query: string) {
    if (
        includes(toLower(name), query) ||
        includes(toLower(category), query) ||
        includes(toLower(floor), query) ||
        includes(toLower(building ?? ''), query)
    ) {
        return true;
    }

    return false;
}

export async function areaDetailsSheet(
    areaData: AreaData,
    setAreaData: (data: AreaData) => void,
    setShowAreaSheet: (areaSheet: boolean) => void
) {
    setAreaData(areaData);
    setShowAreaSheet(true);
    await TrueSheet.dismiss("main-sheet");
    await TrueSheet.present("sub-sheet", 1);
}

const activeFalse = {
    Offices: false,
    Rooms: false,
    Toilets: false,
    Outdoors: false,
};

export async function categorySelect(
    category: Category,
    setSelectedCategory: (category: Category) => void,
    setActiveCategory: (category: ActiveCategory) => void,
) {
    setSelectedCategory(category);

    setActiveCategory({
        ...activeFalse,
        [category]: true
    });

}