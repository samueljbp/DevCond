import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [cpf, setCpf] = useState('');
    const [pwd, setPwd] = useState('');

    const handleLoginButton = async () => {
        if (!(cpf || pwd)) {
            util.showToastAlert('Atenção', 'Preencha os campos');
            return;
        }

        let result = await api.login(cpf, pwd);

        if (result.error === '') {
            dispatch({
                type: 'setToken',
                payload: {
                    token: result.token,
                },
            });

            dispatch({
                type: 'setUser',
                payload: {
                    user: result.user,
                },
            });

            util.navigateWithReset(navigation, 'ChoosePropertyScreen');
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    const handleRegisterButton = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <C.Container>
            <C.ContainerView>
                <C.Logo
                    source={require('../../assets/undraw_home.png')}
                    resizeMode="contain"
                />

                <C.Field
                    placeholder="Digite seu CPF"
                    keyboardType="numeric"
                    value={cpf}
                    onChangeText={t => setCpf(t)}
                />

                <C.Field
                    placeholder="Digite sua senha"
                    keyboardType="numeric"
                    value={pwd}
                    secureTextEntry={true}
                    onChangeText={t => setPwd(t)}
                />

                <C.ButtonArea onPress={handleLoginButton}>
                    <C.ButtonText>ENTRAR</C.ButtonText>
                </C.ButtonArea>

                <C.ButtonArea onPress={handleRegisterButton}>
                    <C.ButtonText>CADASTRAR</C.ButtonText>
                </C.ButtonArea>
            </C.ContainerView>
        </C.Container>
    );
};
