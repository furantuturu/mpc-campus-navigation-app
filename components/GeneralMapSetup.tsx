import { useMyStoreV2 } from '@/store/useMyStore';
import { Camera, ImageSource, RasterLayer } from "@maplibre/maplibre-react-native";

//* Constants
import {
    CAMERA_BOUNDS,
    CAMERA_DEFAULT_SETTINGS,
    IMAGE_OVERLAY_COORDS,
    SCHOOL_IMAGE_URL
} from '@/constants/generalMapConfig';

export default function GeneralMapSetup() {
    const { cameraPitch } = useMyStoreV2();

    return (
        <>
            <ImageSource
                id="mpcimgsource"
                url={SCHOOL_IMAGE_URL}
                coordinates={IMAGE_OVERLAY_COORDS}
            >
                <RasterLayer id="mpcimglayer" sourceID="mpcimgsource" />
            </ImageSource>
            <Camera
                defaultSettings={CAMERA_DEFAULT_SETTINGS}
                minZoomLevel={17}
                maxZoomLevel={20}
                pitch={cameraPitch}
                maxBounds={CAMERA_BOUNDS}
                animationDuration={100}
                animationMode='easeTo'
            />
        </>
    );
}
