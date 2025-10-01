import { IMAGE_BG_OVERLAY_COORDS, IMAGE_OVERLAY_COORDS, SCHOOL_BG_IMAGE_URL, SCHOOL_IMAGE_URL } from "@/constants/generalMapConfig";
import { ImageSource, RasterLayer } from "@maplibre/maplibre-react-native";

export default function SchoolBaseMap() {
    return (
        <>
            <ImageSource
                id="mpcbgimgsource"
                url={SCHOOL_BG_IMAGE_URL}
                coordinates={IMAGE_BG_OVERLAY_COORDS}
            >
                <RasterLayer id="mpcbgimglayer" sourceID="mpcbgimgsource" />
            </ImageSource>
            <ImageSource
                id="mpcimgsource"
                url={SCHOOL_IMAGE_URL}
                coordinates={IMAGE_OVERLAY_COORDS}
            >
                <RasterLayer id="mpcimglayer" sourceID="mpcimgsource" />
            </ImageSource>
        </>
    );
}