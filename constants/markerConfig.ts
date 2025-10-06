import { customBlack, customBlue, customDarkYellow, customRed } from "./floorData";

export const initAnchor = {
    x: 0.5,
    y: 1
};
export const exploreAnchor = {
    x: 0.5,
    y: 0.7
};

export const officeMarkerImg = require("@/assets/images/markers/office-marker-enh.png");
export const roomMarkerImg = require("@/assets/images/markers/room-marker-enh.png");
export const toiletMarkerImg = require("@/assets/images/markers/toilet-marker-enh.png");
export const canteenMarkerImg = require("@/assets/images/markers/canteen-marker-enh.png");
export const swimmingMarkerImg = require("@/assets/images/markers/swimming-marker-enh.png");
export const gymMarkerImg = require("@/assets/images/markers/gym-marker-enh.png");

export const gymNameMarker = require("@/assets/images/buildingnames-markers/Gym-Building.png");
export const maritimeNameMarker = require("@/assets/images/buildingnames-markers/Maritime-Building.png");
export const susanaNameMarker = require("@/assets/images/buildingnames-markers/Susana-Building.png");
export const oldNameMarker = require("@/assets/images/buildingnames-markers/Old-Building.png");
export const mareNameMarker = require("@/assets/images/buildingnames-markers/Mar-E-Shop.png");
export const gate1NameMarker = require("@/assets/images/buildingnames-markers/Gate-1.png");
export const gate2NameMarker = require("@/assets/images/buildingnames-markers/Gate-2.png");

export const stairsMarker = require("@/assets/images/markers/stairs-marker.png");
export const exploreMarker = require("@/assets/images/markers/explore-marker.png");

export const categoryMarkerImg: any = {
    "Offices": officeMarkerImg,
    "Rooms": roomMarkerImg,
    "Toilets": toiletMarkerImg
};
export const outDoorsMarkerImg: any = {
    "Gym": gymMarkerImg,
    "Canteen": canteenMarkerImg,
    "Swimming Area": swimmingMarkerImg
};

export const categoryIconOptions: any = {
    "Offices": {
        icon: "office-building",
        iconColor: customBlue
    },
    "Rooms": {
        icon: "google-classroom",
        iconColor: customRed
    },
    "Toilets": {
        icon: "toilet",
        iconColor: customDarkYellow
    },
    "Outdoors": {
        icon: "home-group",
        iconColor: customBlack
    }
};