import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenSettings} from '@/screens/ScreenSettings';
import {ScreenMainPage} from '@/screens/ScreenMainPage';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useColorScheme} from 'react-native';


const Tab = createBottomTabNavigator();

export function Tabs () {
  const colorScheme = useColorScheme();
  const isBlackTheme = colorScheme === 'dark';

  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: isBlackTheme ? 'rgb(24, 24, 24)' : 'white',
      }}}>
      <Tab.Screen
        name="Home"
        component={ScreenMainPage}
        options={
          { headerShown: false, tabBarLabel: '',
            tabBarIcon: ({focused }) => {
              const color = focused ? 'orange': 'gray';
              const size = focused ? 30: 28;

              return(<Ionicons name="home" size={size} color={color} />);
            }}} />
      <Tab.Screen
        name="Settings"
        component={ScreenSettings}
        options={{ headerShown: false, tabBarLabel: '',
          tabBarIcon: ({focused }) => {
            const color = focused ? 'orange': 'gray';
            const size = focused ? 30: 28;

            return(<Ionicons name="settings" size={size} color={color} />);
          }}} />
    </Tab.Navigator>
  );
}

