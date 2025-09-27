import { ActiveCategory, AreaData, Category, Position } from "@/types/types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { point } from "@turf/helpers";
import { length } from "@turf/length";
import { shortestPath } from "@turf/shortest-path";
import { includes, toLower } from "es-toolkit/compat";
import { campus2FObstacles } from "../obstacles-geojson";

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

export function getRoute(
    start: Position,
    end: Position,
    setRoutePath: (route: GeoJSON.FeatureCollection<GeoJSON.LineString>) => void
) {
    const from = point(start);
    const to = point(end);

    //TODO change obstacle based on floor 
    const calculateShortestPath = shortestPath(from, to, {
        obstacles: campus2FObstacles,
        units: 'meters',
    });
    const pathDistance = length(calculateShortestPath, { units: 'meters' });

    const pathLineString: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    'line-color': '#3887be',
                    'line-width': 3
                },
                geometry: calculateShortestPath.geometry
            }
        ]
    };

    setRoutePath(pathLineString);
}