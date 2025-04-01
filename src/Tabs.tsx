import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from "@/pages/Settings";
import MainPage from "@/pages/MainPage";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export function Tabs() {
    return (
    <Tab.Navigator>
    <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={
        { headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
        )}} />
    <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
            )}} />
    </Tab.Navigator>
);
}

