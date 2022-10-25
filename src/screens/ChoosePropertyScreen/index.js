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
                // ESCOLHYER PROPRIEDADE
            }
            setLoading(false);
        };
        checkPropertySel();
    }, []);

    handleLogout = async () => {
        await api.logout();
        util.navigateWithReset(navigation, 'LoginScreen');
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
                                <C.Button key={index} onPress={null}>
                                    <C.ButtonText>{item.name}</C.ButtonText>
                                </C.Button>
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
