import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dashboard from '../screens/dashboard'
import login from '../screens/login'
import MyTabs from '../routes/mytabs';
import QrCodeScanner from '../screens/QrCodeScanner';
import AffectedZonesList from '../screens/AffectedZonesList'



const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="login"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#2196F3' },
            }}
        >
            <Stack.Screen
                name="login"
                component={login}
                options={{
                    headerShown: false

                }}

            />
            <Stack.Screen
                name="AffectedZonesList"
                component={AffectedZonesList}
                options={{
                    title: 'My Dashboard',
                    headerTitleAlign: 'center',
                    headerLeft: () => null,

                }}
            />
            <Stack.Screen
                name="QrCodeScanner"
                component={QrCodeScanner}
                options={{
                    title: 'Scan Products',
                    headerTitleAlign: 'center',

                }}
            />


        </Stack.Navigator>
    );
}

export default MyStack;
