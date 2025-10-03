import { CAMPUS_BG_IMAGE_URL, CAMPUS_IMAGE_URL, IMAGE_BG_OVERLAY_COORDS, IMAGE_OVERLAY_COORDS } from "@/constants/generalMapConfig";
import { ImageSource, RasterLayer } from "@maplibre/maplibre-react-native";

export default function CampusBaseMap() {
    return (
        <>
            <ImageSource
                id="mpcbgimgsource"
                url={CAMPUS_BG_IMAGE_URL}
                coordinates={IMAGE_BG_OVERLAY_COORDS}
            >
                <RasterLayer id="mpcbgimglayer" sourceID="mpcbgimgsource" />
            </ImageSource>
            <ImageSource
                id="mpcimgsource"
                url={CAMPUS_IMAGE_URL}
                coordinates={IMAGE_OVERLAY_COORDS}
            >
                <RasterLayer id="mpcimglayer" sourceID="mpcimgsource" />
            </ImageSource>
        </>
    );
}