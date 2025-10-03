import { CameraBounds, Position } from "@/types/types";

const INIT_COORDS: Position = [125.14527578791139, 6.1174022336355955];
export const IMAGE_BG_OVERLAY_COORDS: [Position, Position, Position, Position] = [
    [125.112950, 6.120932],
    [125.165715, 6.140763],
    [125.178199, 6.108200],
    [125.124949, 6.088551]
];
export const CAMPUS_BG_IMAGE_URL = require("@/assets/images/mpcbgpic.webp");
export const IMAGE_OVERLAY_COORDS: [Position, Position, Position, Position] = [
    [125.14544362902387, 6.11816384690516],
    [125.1437233331672, 6.117520354279671],
    [125.14420364535526, 6.116247657395669],
    [125.14592652924557, 6.116885371310816]
];
export const CAMPUS_IMAGE_URL = require("@/assets/images/mpcpic.webp");
export const CAMERA_BOUNDS: CameraBounds = {
    ne: [125.14372494489749, 6.116191725240824],
    sw: [125.1459859184514, 6.118166860054188]
};
const INIT_ZOOM_LEVEL = 17;
export const CAMERA_DEFAULT_SETTINGS = {
    centerCoordinate: INIT_COORDS,
    zoomLevel: INIT_ZOOM_LEVEL,
    heading: 250,
};