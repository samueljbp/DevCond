import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkPropertySel = async () => {
            let property = await AsyncStorage.getItem('property');

            if (property) {
                property = JSON.parse(property);
                await chooseProperty(property);
            }
            setLoading(false);
        };
        checkPropertySel();
    }, []);

    handleLogout = async () => {
        await api.logout();
        util.navigateWithReset(navigation, 'LoginScreen');
    };

    const chooseProperty = async property => {
        await AsyncStorage.setItem('property', JSON.stringify(property));

        dispatch({
            type: 'setProperty',
            payload: {
                property,
            },
        });

        util.navigateWithReset(navigation, 'MainDrawer');
    };

    return (
        <C.Container>
            <C.Scroller>
                {loading && <C.LoadingIcon color="#8863E6" size="large" />}
                {!loading && context.user.user.properties.length > 0 && (
                    <>
                        <C.HeadTitle>Olá {context.user.user.name}</C.HeadTitle>
                        <C.HeadTitle>
                            Escolha uma de suas propriedades
                        </C.HeadTitle>

                        <C.PropertyList>
                            {context.user.user.properties.map((item, index) => (
                                <C.ButtonArea
                                    key={index}
                                    onPress={() => chooseProperty(item)}>
                                    <C.ButtonText>{item.name}</C.ButtonText>
                                </C.ButtonArea>
                            ))}
                        </C.PropertyList>
                    </>
                )}
                {!loading && context.user.user.properties.length <= 0 && (
                    <C.BigArea>
                        <C.HeadTitle>
                            {context.user.user.name}, parabéns pelo cadastro
                        </C.HeadTitle>
                        <C.HeadTitle>
                            Agora a administração precisa liberar o seu acesso
                        </C.HeadTitle>
                    </C.BigArea>
                )}
            </C.Scroller>
            <C.ExitButtonArea onPress={handleLogout}>
                <C.ExitButtonText>Sair</C.ExitButtonText>
            </C.ExitButtonArea>
        </C.Container>
    );
};
