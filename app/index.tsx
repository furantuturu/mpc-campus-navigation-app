import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

//* Components
import FloorBottomSheet from "@/components/bottom-sheet-components/MapBottomSheet";
import ActivateUserLocation from "@/components/fab/ActivateUserLocation";
import FloorsSelectionPerCategoryModal from "@/components/fab/FloorsSelectionPerCategoryModal";
import MapDimensionToggle from "@/components/fab/MapDimensionToggle";
import SchoolCategoryButton from "@/components/fab/SchoolCategoryButton";
import AreaSearchBar from "@/components/fab/SearchAreaModal";
import Map from "@/components/marker-components/Map";

export default function Index() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <View style={styles.container}>

          <Map />

          <AreaSearchBar />
          <SchoolCategoryButton />
          <MapDimensionToggle />
          <FloorsSelectionPerCategoryModal />
          <ActivateUserLocation />
        </View>
        <FloorBottomSheet />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  map: {
    flex: 1
  },
});
