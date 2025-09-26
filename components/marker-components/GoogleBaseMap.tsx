import { RasterLayer, RasterSource } from "@maplibre/maplibre-react-native";

export default function GoogleBaseMap() {
    return (
        <RasterSource
            id="basemap"
            tileUrlTemplates={[
                "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
                "https://mt2.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
                "https://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
            ]}
            tileSize={256}
        >
            <RasterLayer id="basemap" />
        </RasterSource>
    );
}