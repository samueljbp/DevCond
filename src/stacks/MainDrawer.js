import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WallScreen from '../screens/WallScreen';
import DocumentScreen from '../screens/DocumentScreen';
import BilletScreen from '../screens/BilletScreen';
import DrawerCustom from '../components/DrawerCustom';

const Drawer = createDrawerNavigator();

export default props => {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerCustom {...props} />}
            screenOptions={{
                headerShown: true,
                title: '',
                headerStyle: {
                    backgroundColor: '#F5F6FA',
                    shadowOpacity: 0,
                    elevation: 0,
                },
            }}
            defaultStatus="closed"
            initialRouteName="WallScreen">
            <Drawer.Screen
                name="WallScreen"
                options={{title: 'Mural de avisos'}}
                component={WallScreen}
            />
            <Drawer.Screen
                name="DocumentScreen"
                options={{title: 'Documentos do condomínio'}}
                component={DocumentScreen}
            />
            <Drawer.Screen
                name="BilletScreen"
                options={{title: 'Boletos de condomínio'}}
                component={BilletScreen}
            />
        </Drawer.Navigator>
    );
};
