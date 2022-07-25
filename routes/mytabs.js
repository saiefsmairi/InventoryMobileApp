
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AffectedZonesList from '../screens/AffectedZonesList'
import QrCodeScanner from '../screens/QrCodeScanner'
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'black',
      }}>
      <Tab.Screen name="AffectedZonesList" component={AffectedZonesList}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="QrCodeScanner" component={QrCodeScanner}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="barcode" size={size} color={color} />),
        }} />
    </Tab.Navigator>
  );
}

export default MyTabs