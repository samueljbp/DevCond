import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PreloadScreen from '../screens/PreloadScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            initialRouteName="PreloadScreen"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#FFF',
                },
            }}>
            <Stack.Screen name="PreloadScreen" component={PreloadScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    );
};
