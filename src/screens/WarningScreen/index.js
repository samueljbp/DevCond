import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './styles';
import {
    useNavigation,
    useFocusEffect,
    useRoute,
} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';
import WarningItem from '../../components/WarningItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {current} from '@reduxjs/toolkit';

export default ({route}) => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [currentProperty, setCurrentProperty] = useState();

    useEffect(() => {
        const getProperties = async () => {
            getWarnings();
        };

        getProperties();
    }, []);

    React.useEffect(() => {
        if (route.params?.forceRefresh) {
            const getProperties = async () => {
                getWarnings();
            };

            getProperties();
        }
    }, [route.params?.forceRefresh]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <C.AddButton
                    onPress={() => navigation.navigate('WarningAddScreen')}>
                    <Icon name="plus" size={24} color="#000" />
                </C.AddButton>
            ),
        });
    }, []);

    const getWarnings = async () => {
        setLoading(true);
        let property = await AsyncStorage.getItem('property');
        if (property) {
            property = JSON.parse(property);

            const result = await api.getWarnings(property.id);
            setLoading(false);
            setCurrentProperty(property);
            if (result.error === '') {
                setList(result.list);
            } else {
                util.showToastAlert('Erro', result.error);
            }
        }
    };

    return (
        <C.Container>
            {!loading && list.length === 0 && (
                <C.NoListArea>
                    <C.NoListText>
                        Não há ocorrências para a propriedade{' '}
                        {currentProperty ? currentProperty.name : ''}
                    </C.NoListText>
                </C.NoListArea>
            )}
            <C.List
                data={list}
                onRefresh={() => getWarnings()}
                refreshing={loading}
                renderItem={({item}) => <WarningItem data={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </C.Container>
    );
};
