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
    const { cameraPitch, areaCoordinates, cameraFocus, setCameraFocus } = useMyStoreV2();
    const cameraRef = useRef<CameraRef>(null);

    useEffect(() => {
        if (cameraFocus) {
            cameraRef.current?.setCamera({
                centerCoordinate: areaCoordinates,
                animationDuration: 500
            });
            setCameraFocus(false);
        } else {
            cameraRef.current?.setCamera({
                stops: [{
                    centerCoordinate: areaCoordinates,
                    animationDuration: 500
                }]
            });
        }

    }, [areaCoordinates, cameraFocus, setCameraFocus]);


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

