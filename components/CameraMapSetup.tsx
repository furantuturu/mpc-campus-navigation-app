import {
    CAMERA_BOUNDS,
    CAMERA_DEFAULT_SETTINGS
} from '@/constants/generalMapConfig';
import { useMyStoreV2, useUserLocStore } from '@/store/useMyStore';
import { Camera, CameraRef } from "@maplibre/maplibre-react-native";
import { useEffect, useRef } from 'react';

export default function CameraMapSetup() {
    const { cameraPitch, setCameraPitch, areaCoordinates, cameraFocus, setCameraFocus } = useMyStoreV2();
    const { userCameraHeading, userCoordinates, userFollowMode } = useUserLocStore();
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
                    animationDuration: 100
                }]
            });
        }

    }, [areaCoordinates, cameraFocus, setCameraFocus]);


    useEffect(() => {
        if (userFollowMode) {
            cameraRef.current?.setCamera({
                centerCoordinate: userCoordinates!,
                heading: userCameraHeading,
                animationDuration: 300,
            });
            setCameraPitch(60);
        } else {
            cameraRef.current?.setCamera({
                stops: [{
                    centerCoordinate: userCoordinates!,
                    animationDuration: 100,
                }]
            });
            setCameraPitch(0);
        }
    }, [setCameraPitch, userCameraHeading, userCoordinates, userFollowMode]);

    return (
        <Camera
            ref={cameraRef}
            defaultSettings={CAMERA_DEFAULT_SETTINGS}
            minZoomLevel={17}
            maxZoomLevel={20}
            pitch={cameraPitch}
            maxBounds={CAMERA_BOUNDS}
            animationDuration={100}
        />
    );
}

