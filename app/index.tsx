import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";

//* Components
import FloorBottomSheet from "@/components/bottom-sheet-components/MapBottomSheet";
import AreaSearchBar from "@/components/fab/AreaSearchBar";
import FloorsSelectionPerCategoryModal from "@/components/fab/FloorsSelectionPerCategoryModal";
import MapDimensionToggle from "@/components/fab/MapDimensionToggle";
import SchoolCategoryButton from "@/components/fab/SchoolCategoryButton";
import Map from "@/components/marker-components/Map";

export default function Index() {
  return (
    <PaperProvider>
      <View style={styles.container}>

        <Map />

        <AreaSearchBar />
        <FloorsSelectionPerCategoryModal />
        <MapDimensionToggle />
        <SchoolCategoryButton />
      </View>
      <FloorBottomSheet />
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
