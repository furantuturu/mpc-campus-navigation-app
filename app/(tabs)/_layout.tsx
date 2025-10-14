import { useUserLocStore } from "@/store/useMyStore";
import { useFocusEffect } from '@react-navigation/native';
import { Tabs } from "expo-router";
import { useCallback } from "react";
import { BackHandler } from 'react-native';
import { Icon } from "react-native-paper";

export default function TabLayout() {
    const { isNavigating } = useUserLocStore();

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#010840",
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    display: isNavigating ? "none" : "flex",
                },
                animation: 'shift',
            }}
        >
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