import { useUserLocStore } from "@/store/useMyStore";
import { Tabs, usePathname } from "expo-router";
import { Icon } from "react-native-paper";

export default function TabLayout() {
    const pathname = usePathname();
    const { isNavigating } = useUserLocStore();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#010840",
            headerShown: false,
            tabBarStyle: {
                backgroundColor: "white",
                display: isNavigating ? "none" : "flex"
            },
            animation: 'shift',
            tabBarPosition: pathname === "/" ? "bottom" : "top",
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color, focused }) => (
                        <Icon source={focused ? "map" : "map-outline"} color={color} size={25} />
                    ),
                    href: isNavigating ? null : undefined
                }}
            />
            <Tabs.Screen
                name="navigate"
                options={{
                    title: "Navigate",
                    tabBarIcon: ({ color, focused }) => (
                        <Icon source={focused ? "map-search" : "map-search-outline"} color={color} size={25} />
                    ),
                    href: isNavigating ? null : undefined
                }}
            />
        </Tabs>
    );
}