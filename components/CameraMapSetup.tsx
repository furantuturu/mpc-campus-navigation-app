import { useMyStoreV2 } from '@/store/useMyStore';
import { Camera, CameraRef } from "@maplibre/maplibre-react-native";

//* Constants
import {
    CAMERA_DEFAULT_SETTINGS
} from '@/constants/generalMapConfig';
import { useEffect, useRef } from 'react';

export default function CameraMapSetup() {
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
        <Camera
            ref={cameraRef}
            defaultSettings={CAMERA_DEFAULT_SETTINGS}
            minZoomLevel={17}
            maxZoomLevel={20}
            pitch={cameraPitch}
            // maxBounds={CAMERA_BOUNDS}
            animationDuration={100}
        />
    );
}

