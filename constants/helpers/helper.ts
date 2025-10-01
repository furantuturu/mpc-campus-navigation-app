import { ActiveCategory, AreaData, Category, Floor, Position } from "@/types/types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { point } from "@turf/helpers";
import { length } from "@turf/length";
import { shortestPath } from "@turf/shortest-path";
import { includes, toLower } from "es-toolkit/compat";
import { enableNetworkProviderAsync, hasServicesEnabledAsync } from "expo-location";
import { Alert } from "react-native";
import { campus1FObstacles, } from "../1fObstaclesGeojson";
import { campus2FObstacles } from "../2fObstaclesGeojson";
import { campus3FObstacles } from "../3fObstaclesGeojson";

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
    floor: Floor,
    setRoutePath: (route: GeoJSON.FeatureCollection<GeoJSON.LineString>) => void,
    setRouteDistance: (distance: number) => void
) {
    const from = point(start);
    const to = point(end);

    let obstacles;
    switch (floor) {
        case "1F":
            obstacles = campus1FObstacles;
            break;
        case "2F":
            obstacles = campus2FObstacles;
            break;
        case "3F":
            obstacles = campus3FObstacles;
            break;
        default:
            obstacles = campus2FObstacles;
            break;
    }

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

export async function checkLocationServices() {
    const servicesEnabled = await hasServicesEnabledAsync();

    if (!servicesEnabled) {
        try {
            await enableNetworkProviderAsync();
        } catch (error) {
            console.error("Error getting location from enabling service: ", error);
            Alert.alert("Location services is required for this app");
            return;
        }
    }

    return servicesEnabled;
}