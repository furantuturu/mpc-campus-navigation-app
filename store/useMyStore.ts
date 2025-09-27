import {
    ActiveCategory,
    AreaData,
    Category,
    Floor,
    Position
} from '@/types/types';
import { create } from 'zustand';

interface Store {
    cameraPitch: 0 | 60;
    setCameraPitch: (pitch: 0 | 60) => void;
    selectedCategory: Category;
    setSelectedCategory: (category: Category) => void;
    selectedFloor: Floor;
    setSelectedFloor: (floor: Floor) => void;
    showAreaSheet: boolean;
    setShowAreaSheet: (areaSheet: boolean) => void;
    areaData: AreaData,
    setAreaData: (data: AreaData) => void;
    activeCategory: ActiveCategory;
    setActiveCategory: (active: ActiveCategory) => void;
    areaCoordinates: Position;
    setAreaCoordinates: (coords: Position) => void;
    cameraFocus: boolean;
    setCameraFocus: (camFocus: boolean) => void;
    routePath: GeoJSON.FeatureCollection<GeoJSON.LineString> | null;
    setRoutePath: (route: GeoJSON.FeatureCollection<GeoJSON.LineString> | null) => void;
}

export const useMyStoreV2 = create<Store>((set) => ({
    cameraPitch: 0,
    setCameraPitch: (pitch) => set({ cameraPitch: pitch }),
    selectedCategory: "Offices",
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    selectedFloor: "1F",
    setSelectedFloor: (floor) => set({ selectedFloor: floor }),
    showAreaSheet: false,
    setShowAreaSheet: (areaSheet) => set({ showAreaSheet: areaSheet }),
    areaData: { id: "", name: "", category: "", floor: "", coordinates: { latitude: 0, longitude: 0 } },
    setAreaData: (data: AreaData) => set({ areaData: data }),
    activeCategory: {
        Offices: true,
        Rooms: false,
        Toilets: false,
        Outdoors: false,
    },
    setActiveCategory: (active: ActiveCategory) => set({ activeCategory: active }),
    areaCoordinates: [125.14527578791139, 6.1174022336355955],
    setAreaCoordinates: (coords: Position) => set({ areaCoordinates: coords }),
    cameraFocus: false,
    setCameraFocus: (camFocus: boolean) => set({ cameraFocus: camFocus }),
    routePath: null,
    setRoutePath: (route: GeoJSON.FeatureCollection<GeoJSON.LineString> | null) => set({ routePath: route })
}));