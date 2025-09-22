import {
    AreaData,
    Category,
    Floor
} from '@/types/types';
import { create } from 'zustand';

interface StoreV2 {
    cameraPitch: 0 | 60;
    setCameraPitch: (pitch: 0 | 60) => void;
    selectedCategory: Category;
    setSelectedCategory: (category: Category) => void;
    selectedFloor: Floor;
    setSelectedFloor: (floor: Floor) => void;
    isPanning: boolean;
    setIsPanning: (isPanning: boolean) => void;
    showAreaSheet: boolean;
    setShowAreaSheet: (areaSheet: boolean) => void;
    areaData: AreaData,
    setAreaData: (data: AreaData) => void;
}

export const useMyStoreV2 = create<StoreV2>((set) => ({
    cameraPitch: 0,
    setCameraPitch: (pitch) => set({ cameraPitch: pitch }),
    selectedCategory: "Offices",
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    selectedFloor: "F1",
    setSelectedFloor: (floor) => set({ selectedFloor: floor }),
    isPanning: false,
    setIsPanning: (panning) => set({ isPanning: panning }),
    showAreaSheet: false,
    setShowAreaSheet: (areaSheet) => set({ showAreaSheet: areaSheet }),
    areaData: { id: "", name: "", category: "", floor: "", coordinates: { latitude: 0, longitude: 0 } },
    setAreaData: (data: AreaData) => set({ areaData: data })
}));