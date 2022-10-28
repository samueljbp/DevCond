import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WallScreen from '../screens/WallScreen';
import BlahScreen from '../screens/WallScreen';
import {NavigationContainer} from '@react-navigation/native';
import DrawerCustom from '../components/DrawerCustom';
import {
    useNavigation,
    getFocusedRouteNameFromRoute,
    useRoute,
} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default props => {
    const route = useRoute();
    const routeName = getFocusedRouteNameFromRoute(route) ?? ``;

    return (
        <Drawer.Navigator
            drawerContent={props => (
                <DrawerCustom {...props} focusedRoute={routeName} />
            )}
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
        </Drawer.Navigator>
    );
};
