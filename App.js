import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StateProvider} from './src/contexts/StateContext';
import AuthStack from './src/stacks/AuthStack';
import {NativeBaseProvider} from 'native-base';

export default () => {
    return (
        <StateProvider>
            <NativeBaseProvider>
                <NavigationContainer>
                    <AuthStack />
                </NavigationContainer>
            </NativeBaseProvider>
        </StateProvider>
    );
};
