
export type Position = GeoJSON.Position;
export interface CameraBounds {
    ne: number[];
    sw: number[];
}
export interface AreaFocus {
    coordinates: Position,
    zoomTo: number;
}
export type Floor = "1F" | "2F" | "3F" | "4F";
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
export interface ExploreData {
    id: string;
    imageFileName: string,
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
    ["Outdoors"]: Floor[];
}

export interface ActiveCategory {
    Offices: boolean;
    Rooms: boolean;
    Toilets: boolean;
    Outdoors: boolean;
}