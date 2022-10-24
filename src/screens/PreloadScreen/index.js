import React, {useEffect} from 'react';
import api from '../../services/api';
import C from './styles';
import util from '../../util/util';
import {useStateValue} from '../../contexts/StateContext';
import {useNavigation} from '@react-navigation/native';

export default () => {
    const [context, dispatch] = useStateValue();
    const navigator = useNavigation();

    useEffect(() => {
        const checkLogin = async () => {
            let token = await api.getToken();
            if (token) {
                let result = await api.validateToken(token);
                if (result.error === '') {
                    dispatch({
                        type: 'setUser',
                        payload: {
                            user: result.user,
                        },
                    });
                    util.navigateWithReset(navigator, 'ChoosePropertyScreen');
                } else {
                    alert(result.error);
                    dispatch({
                        type: 'setToken',
                        payload: {token: ''},
                    });
                    util.navigateWithReset(navigator, 'LoginScreen');
                }
            } else {
                util.navigateWithReset(navigator, 'LoginScreen');
            }
        };

        checkLogin();
    }, []);

    return (
        <C.Container>
            <C.LoadingIcon color="#8863E6" size="large" />
        </C.Container>
    );
};
