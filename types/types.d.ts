import { RegionPayload } from "@maplibre/maplibre-react-native";

export type Position = number[];
export interface CameraBounds {
    ne: number[];
    sw: number[];
}
export type RegionPayloadFeature = GeoJSON.Feature<GeoJSON.Point, RegionPayload>;
export type Floor = "F1" | "F2" | "F3" | "F4";
export interface AreaData {
    id: string;
    name: string;
    category: string;
    floor: string;
    building?: string;
    coordinates: {
        latitude: number,
        longitude: number,
    };
}
export type Building = Record<string, AreaData[]>;
export interface BuildingsFilter {
    id: string;
    name: string,
    checked: boolean;
};

export type Category = "Offices" | "Rooms" | "Toilets" | "Outdoors";
export interface FloorsPerCategory {
    ["Offices"]: Floor[];
    ["Rooms"]: Floor[];
    ["Toilets"]: Floor[];
    ["Outdoors"]: null;
}
