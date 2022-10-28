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
    const [currentProperty, setCurrentProperty] = useState();

    useEffect(() => {
        const getProperties = async () => {
            let property = await AsyncStorage.getItem('property');
            if (property) {
                property = JSON.parse(property);
                getBillets(property);
            }
        };

        getProperties();
    }, []);

    const getBillets = async property => {
        setLoading(true);
        const result = await api.getBillets(property.id);
        setLoading(false);
        setCurrentProperty(property);
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
                        {currentProperty ? currentProperty.name : ''}
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
