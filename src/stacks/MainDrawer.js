import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WallScreen from '../screens/WallScreen';
import DocumentScreen from '../screens/DocumentScreen';
import BilletScreen from '../screens/BilletScreen';
import DrawerCustom from '../components/DrawerCustom';
import WarningScreen from '../screens/WarningScreen';
import WarningAddScreen from '../screens/WarningAddScreen';
import ReservationScreen from '../screens/ReservationScreen';
import LostAndFoundScreen from '../screens/LostAndFoundScreen';
import LostAndFoundAddScreen from '../screens/LostAndFoundAddScreen';
import UnitScreen from '../screens/UnitScreen';

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
            <Drawer.Screen
                name="WarningScreen"
                options={{title: 'Livro de ocorrências'}}
                component={WarningScreen}
            />
            <Drawer.Screen
                name="WarningAddScreen"
                options={{title: 'Adicionar uma ocorrência'}}
                component={WarningAddScreen}
            />
            <Drawer.Screen
                name="ReservationScreen"
                options={{title: 'Reservas disponíveis'}}
                component={ReservationScreen}
            />
            <Drawer.Screen
                name="LostAndFoundScreen"
                options={{title: 'Achados e perdidos'}}
                component={LostAndFoundScreen}
            />
            <Drawer.Screen
                name="LostAndFoundAddScreen"
                options={{title: 'Adicionar um Perdido'}}
                component={LostAndFoundAddScreen}
            />
            <Drawer.Screen name="UnitScreen" component={UnitScreen} />
        </Drawer.Navigator>
    );
};
