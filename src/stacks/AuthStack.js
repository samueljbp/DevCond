import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PreloadScreen from '../screens/PreloadScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChoosePropertyScreen from '../screens/ChoosePropertyScreen';
import MainDrawer from './MainDrawer';

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            initialRouteName="PreloadScreen"
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#F5F6FA',
                    shadowOpacity: 0,
                },
                cardStyle: {
                    backgroundColor: '#FFF',
                },
            }}>
            <Stack.Screen name="PreloadScreen" component={PreloadScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{headerShown: true, headerTitle: 'Cadastrar'}}
            />
            <Stack.Screen
                name="ChoosePropertyScreen"
                component={ChoosePropertyScreen}
            />
            <Stack.Screen name="MainDrawer" component={MainDrawer} />
        </Stack.Navigator>
    );
};
