import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <>
      <Stack screenOptions={{
        headerShown: false,
        statusBarHidden: true
      }}>
        <Stack.Screen
          name="bottom-sheet"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: [0.20, 0.30, 0.70],
            animation: "slide_from_bottom",
            sheetCornerRadius: 24,
            sheetLargestUndimmedDetentIndex: "last",
            sheetInitialDetentIndex: 0,
            sheetElevation: 24
          }}
        />
      </Stack>;
    </>
  );

}
