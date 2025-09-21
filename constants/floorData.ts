import schoolData from "@/assets/floors/school-data.json";
import { FloorsPerCategory } from "@/types/types";

export const floorsPerCategory: FloorsPerCategory = {
    "Offices": ["F1", "F3", "F4"],
    "Rooms": ["F1", "F2", "F3", "F4"],
    "Toilets": ["F1", "F2", "F3", "F4"],
    "Outdoors": null,
};

export const officeData = schoolData["Offices"];
export const roomData = schoolData["Rooms"];
export const toiletData = schoolData["Toilets"];
export const outdoorData = schoolData["Outdoor"];

export const roomBuildingNamesPerFloor = {
    "F1": ["Old Building", "Maritime Building", "Susana Building", "Mar-E"],
    "F2": ["Maritime Building", "Susana Building", "Mar-E"],
    "F3": ["Maritime Building", "Susana Building"],
    "F4": ["Susana Building"]
};

export const officeBuildingNamesPerFloor = {
    "F1": ["Old Building", "Gym Building", "Maritime Building", "Susana Building", "Mar-E", "Outside"],
    "F3": ["Maritime Building"],
    "F4": ["Susana Building"]
};

export const customBlue = "#0593fc";
export const customBlueButton = "#c7e6fdff";
export const customRed = "#fe4343";
export const customRedButton = "#ffd1d1ff";
export const customYellow = "#fff71f";
export const customYellowButton = "#fffed7ff";
export const customBlack = "#565656";
export const customBlackButton = "#c4c4c4ff";