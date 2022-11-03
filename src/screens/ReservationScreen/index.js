import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';
import DocItem from '../../components/DocItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        getReservations();
    }, []);

    const getReservations = async property => {
        setLoading(true);
        const result = await api.getReservations();
        setLoading(false);
        if (result.error === '') {
            setList(result.list);
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    return (
        <C.Container>
            <C.Scroller>
                <C.ButtonArea onPress={null}>
                    <C.ButtonText>Minhas reservas</C.ButtonText>
                </C.ButtonArea>

                <C.Title>Selecione uma área</C.Title>

                {loading && <C.LoadingIcon size="large" color="#8863E6" />}

                {!loading && list.length === 0 && (
                    <C.NoListArea>
                        <C.NoListText>Não há áreas disponíveis</C.NoListText>
                    </C.NoListArea>
                )}
            </C.Scroller>
        </C.Container>
    );
};
