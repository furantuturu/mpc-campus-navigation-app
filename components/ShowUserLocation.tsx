import { useUserLocStore } from "@/store/useMyStore";
import { UserLocation } from "@maplibre/maplibre-react-native";

export default function ShowUserLocation() {
    const { showUserLocation, isLocationServiceEnabled } = useUserLocStore();

    return (
        <UserLocation
            visible={showUserLocation && isLocationServiceEnabled}
            animated
            renderMode="native"
            androidRenderMode="gps"
            showsUserHeadingIndicator
        />
    );
}