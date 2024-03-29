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
    const [billetList, setBilletList] = useState([]);

    useEffect(() => {
        getBillets();
    }, []);

    const getBillets = async () => {
        setLoading(true);
        const result = await api.getBillets(context.user.property.id);
        setLoading(false);
        if (result.error === '') {
            setBilletList(result.list);
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    return (
        <C.Container>
            {!loading && billetList.length === 0 && (
                <C.NoListArea>
                    <C.NoListText>
                        Não há boletos para a propriedade{' '}
                        {context.user.property.name}
                    </C.NoListText>
                </C.NoListArea>
            )}
            <C.List
                data={billetList}
                onRefresh={getBillets}
                refreshing={loading}
                renderItem={({item}) => <DocItem data={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </C.Container>
    );
};
