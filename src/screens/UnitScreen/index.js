import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [peopleList, setPeopleList] = useState([]);
    const [vehicleList, setVehicleList] = useState([]);
    const [petList, setPetList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            title: `Dados da unidade ${context.user.property.name}`,
        });
        getUnitInfo();
    }, []);

    const getUnitInfo = async () => {
        setLoading(true);
        const result = await api.getUnitInfo();
        setLoading(false);

        if (result.error === '') {
            setPeopleList(result.peoples);
            setVehicleList(result.vehicles);
            setPetList(result.pets);
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    return (
        <C.Container>
            <C.Scroller>
                {loading && <C.LoadingIcon color="#8B63E7" size="large" />}
                {!loading && <></>}
            </C.Scroller>
        </C.Container>
    );
};
