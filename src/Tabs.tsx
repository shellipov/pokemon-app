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

  const tabOptions = (iconName: string) => {
   return { headerShown: false, tabBarLabel: '',
    tabBarIcon: ({focused }: {focused: boolean}) => {
     const color = focused ? 'orange': 'gray';
      const size = focused ? 30: 28;

       return(<Ionicons name={iconName} size={size} color={color} />);
   }}}

  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {backgroundColor: isBlackTheme ? 'rgb(24, 24, 24)' : 'white'}}}>
      <Tab.Screen
        name="Home"
        component={ScreenMainPage}
        options={tabOptions('home')} />
      <Tab.Screen
        name="Settings"
        component={ScreenSettings}
        options={tabOptions('settings')} />
    </Tab.Navigator>
  );
}

