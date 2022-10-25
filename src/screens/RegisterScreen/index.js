import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';
import ValidatableTextInput from '../../components/ValidatableTextInput';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [name, setName] = useState('');
    const [nameHasError, setNameHasError] = useState(false);
    const [cpf, setCpf] = useState('');
    const [cpfHasError, setCpfHasError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailHasError, setEmailHasError] = useState(false);
    const [pwd, setPwd] = useState('');
    const [pwdHasError, setPwdHasError] = useState(false);
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [pwdConfirmHasError, setPwdConfirmHasError] = useState(false);

    const handleRegisterButton = async () => {
        if (name === '') {
            setNameHasError(true);
        }

        if (cpf === '') {
            setCpfHasError(true);
        }

        if (email === '') {
            setEmailHasError(true);
        }

        if (pwd === '') {
            setPwdHasError(true);
        }

        if (pwdConfirm === '') {
            setPwdConfirmHasError(true);
        }

        if (
            name === '' ||
            cpf === '' ||
            email === '' ||
            pwd === '' ||
            pwdConfirm === ''
        ) {
            util.showToastAlert('Atenção', 'Preencha todos os campos');

            return;
        }

        let result = await api.register(name, email, cpf, pwd, pwdConfirm);

        if (result.error) {
            util.showToastAlert('Erro', result.error);
            return;
        } else {
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
        }
    };

    return (
        <C.Container>
            <ValidatableTextInput
                placeholder="Digite seu nome completo"
                value={name}
                isRequired={true}
                hasError={nameHasError}
                onChangeTextAction={t => setName(t)}
            />

            <ValidatableTextInput
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                isRequired={true}
                hasError={cpfHasError}
                onChangeTextAction={t => setCpf(t)}
            />

            <ValidatableTextInput
                placeholder="Digite seu nome email"
                value={email}
                isRequired={true}
                hasError={emailHasError}
                onChangeTextAction={t => setEmail(t)}
            />

            <ValidatableTextInput
                placeholder="Digite sua senha"
                value={pwd}
                isRequired={true}
                hasError={pwdHasError}
                secureTextEntry={true}
                onChangeTextAction={t => setPwd(t)}
            />

            <ValidatableTextInput
                placeholder="Confirme sua senha"
                value={pwdConfirm}
                isRequired={true}
                hasError={pwdConfirmHasError}
                secureTextEntry={true}
                onChangeTextAction={t => setPwdConfirm(t)}
            />

            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR</C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    );
};
