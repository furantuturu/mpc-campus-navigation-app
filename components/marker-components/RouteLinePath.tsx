import { useMyStoreV2 } from "@/store/useMyStore";
import { LineLayer, ShapeSource } from "@maplibre/maplibre-react-native";

export default function RouteLinePath() {
    const { routePath } = useMyStoreV2();

    return (
        <>
            {routePath && (
                <ShapeSource
                    id="shortest-path"
                    shape={routePath}
                >
                    <LineLayer
                        id="line-path"
                        style={{
                            lineColor: '#3887be',
                            lineWidth: 4,
                            lineCap: 'round',
                            lineJoin: 'round'
                        }}
                    />
                </ShapeSource>
            )}
        </>
    );
}