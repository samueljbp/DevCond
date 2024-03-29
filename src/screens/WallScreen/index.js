import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';
import WallItem from '../../components/WallItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [wallList, setWallList] = useState([]);

    useEffect(() => {
        getWall();
    }, []);

    const getWall = async () => {
        setLoading(true);
        const result = await api.getWall();
        setLoading(false);
        if (result.error === '') {
            setWallList(result.list);
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    return (
        <C.Container>
            {!loading && wallList.length === 0 && (
                <C.NoListArea>
                    <C.NoListText>Não há avisos</C.NoListText>
                </C.NoListArea>
            )}
            <C.List
                data={wallList}
                onRefresh={getWall}
                refreshing={loading}
                renderItem={({item}) => <WallItem data={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </C.Container>
    );
};
