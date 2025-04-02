import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ScreenSettings} from '@/screens/ScreenSettings';
import { ScreenMainPage } from '@/screens/ScreenMainPage';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export function Tabs() {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainPage"
        component={ScreenMainPage}
        options={
          { headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            )}} />
      <Tab.Screen
        name="Settings"
        component={ScreenSettings}
        options={{ headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          )}} />
    </Tab.Navigator>
  );
}

