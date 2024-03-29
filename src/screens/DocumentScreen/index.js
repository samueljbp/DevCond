import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';
import DocItem from '../../components/DocItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [docList, setDocList] = useState([]);

    useEffect(() => {
        getDocs();
    }, []);

    const getDocs = async () => {
        setLoading(true);
        const result = await api.getDocs();
        setLoading(false);
        if (result.error === '') {
            setDocList(result.list);
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    return (
        <C.Container>
            {!loading && docList.length === 0 && (
                <C.NoListArea>
                    <C.NoListText>Não há documentos</C.NoListText>
                </C.NoListArea>
            )}
            <C.List
                data={docList}
                onRefresh={getDocs}
                refreshing={loading}
                renderItem={({item}) => <DocItem data={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </C.Container>
    );
};
