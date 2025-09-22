import { AreaData } from "@/types/types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { words } from "es-toolkit";
import { includes, join, toLower } from "es-toolkit/compat";

export function contains({ category, floor, building, name }: AreaData, query: string) {
    if (
        includes(toLower(category), query) ||
        includes(toLower(join(words(floor), '')), query) ||
        includes(toLower(join(words(building ?? ''), '')), query) ||
        includes(toLower(join(words(name), '')), query)
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
    await TrueSheet.dismiss("main-sheet");
    await TrueSheet.present("sub-sheet", 1);
    setAreaData(areaData);
    setShowAreaSheet(true);
}