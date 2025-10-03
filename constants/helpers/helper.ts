import { ActiveCategory, AreaData, Category, Floor, Position } from "@/types/types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { point } from "@turf/helpers";
import { length } from "@turf/length";
import { shortestPath } from "@turf/shortest-path";
import { includes, toLower } from "es-toolkit/compat";
import { campus1FObstacles, } from "../1fObstaclesGeojson";
import { campus2FObstacles } from "../2fObstaclesGeojson";
import { campus3FObstacles } from "../3fObstaclesGeojson";
import { IMAGE_OVERLAY_COORDS } from "../generalMapConfig";

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
    await TrueSheet.present("sub-sheet", 0);
}

const activeFalse = {
    Offices: false,
    Rooms: false,
    Toilets: false,
    Outdoors: false,
};

export function categorySelect(
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

const obstaclesCache: any = {
    "1F": campus1FObstacles,
    "2F": campus2FObstacles,
    "3F": campus3FObstacles,
    "4F": campus2FObstacles
} as const;

export function getRoute(
    start: Position,
    end: Position,
    floor: Floor,
    setRoutePath: (route: GeoJSON.FeatureCollection<GeoJSON.LineString>) => void,
    setRouteDistance: (distance: number) => void
) {
    const from = point(start);
    const to = point(end);

    const obstacles = obstaclesCache[floor];

    const calculateShortestPath = shortestPath(from, to, {
        obstacles: obstacles,
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
    setRouteDistance(pathDistance);
}

export function isUserInsideCampus(userCoords: Position) {
    const [x, y] = userCoords;
    const boundary = IMAGE_OVERLAY_COORDS;
    let inside = false;

    for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i++) {
        const [xi, yi] = boundary[i];
        const [xj, yj] = boundary[j];

        const intersect = ((yi > y) !== (yj > y) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi));

        if (intersect) inside = !inside;
    }

    return inside;
}