import { useUserLocStore } from "@/store/useMyStore";
import { UserLocation } from "@maplibre/maplibre-react-native";

export default function ShowUserLocation() {
    const { showUserLocation } = useUserLocStore();

    if (!showUserLocation) return null;

    return (
        <UserLocation
            animated
            renderMode="native"
            androidRenderMode="gps"
            showsUserHeadingIndicator
            minDisplacement={10}
        />
    );
}