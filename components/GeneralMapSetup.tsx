import { useMyStoreV2 } from '@/store/useMyStore';
import { Camera, CameraRef, ImageSource, RasterLayer } from "@maplibre/maplibre-react-native";

//* Constants
import {
    CAMERA_BOUNDS,
    CAMERA_DEFAULT_SETTINGS,
    IMAGE_OVERLAY_COORDS,
    SCHOOL_IMAGE_URL
} from '@/constants/generalMapConfig';
import { useEffect, useRef } from 'react';

export default function GeneralMapSetup() {
    const { cameraPitch, areaFocus } = useMyStoreV2();
    const cameraRef = useRef<CameraRef>(null);

    useEffect(() => {
        cameraRef.current?.setCamera({
            centerCoordinate: areaFocus.coordinates,
            zoomLevel: areaFocus.zoomTo,
            animationDuration: 500,
            animationMode: 'flyTo'
        });
    }, [areaFocus]);

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
                ref={cameraRef}
                defaultSettings={CAMERA_DEFAULT_SETTINGS}
                minZoomLevel={17}
                maxZoomLevel={20}
                pitch={cameraPitch}
                maxBounds={CAMERA_BOUNDS}
                animationDuration={100}
            />
        </>
    );
}

