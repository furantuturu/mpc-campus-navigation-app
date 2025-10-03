import campusDataSearch from "@/assets/floors/campus-data-for-search.json";
import campusData from "@/assets/floors/campus-data.json";
import { AreaData, FloorsPerCategory } from "@/types/types";

export const floorsPerCategory: FloorsPerCategory = {
    "Offices": ["1F", "3F", "4F"],
    "Rooms": ["1F", "2F", "3F", "4F"],
    "Toilets": ["1F", "2F", "3F", "4F"],
    "Outdoors": ["1F"]
};

export const officeData = campusData["Offices"];
export const roomData = campusData["Rooms"];
export const toiletData = campusData["Toilets"];
export const outdoorData = campusData["Outdoors"];

export const campusDataForSearch: AreaData[] = campusDataSearch;

export const roomBuildingNamesPerFloor = {
    "1F": ["Old Building", "Maritime Building", "Susana Building", "Mar-E"],
    "2F": ["Maritime Building", "Susana Building", "Mar-E"],
    "3F": ["Maritime Building", "Susana Building"],
    "4F": ["Susana Building"]
};

export const officeBuildingNamesPerFloor = {
    "1F": ["Old Building", "Gym Building", "Maritime Building", "Susana Building", "Mar-E", "Outside"],
    "3F": ["Maritime Building"],
    "4F": ["Susana Building"]
};

export const customBlue = "#0593fc";
export const customBlueButton = "#c7e6fdff";
export const customRed = "#fe4343";
export const customRedButton = "#ffd1d1ff";
export const customYellow = "#fff71f";
export const customDarkYellow = "#e0da23ff";
export const customYellowButton = "#fffed7ff";
export const customBlack = "#565656";
export const customBlackButton = "#c4c4c4ff";