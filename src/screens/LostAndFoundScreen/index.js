import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';
import LostItem from '../../components/LostItem';
import Icon from 'react-native-vector-icons/FontAwesome';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [lostList, setLostList] = useState([]);
    const [foundList, setFoundList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <C.AddButton onPress={handleAddItem}>
                    <Icon name="plus" size={24} color="#000" />
                </C.AddButton>
            ),
        });

        getLostAndFound();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getLostAndFound();
        });
        return unsubscribe;
    }, [navigation]);

    const handleAddItem = () => {
        navigation.navigate('LostAndFoundAddScreen');
    };

    const getLostAndFound = async property => {
        setLoading(true);
        const result = await api.getLostAndFound();
        setLoading(false);
        if (result.error === '') {
            setLostList(result.lost);
            setFoundList(result.recovered);
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    return (
        <C.Container>
            <C.Scroller>
                {loading && <C.LoadingIcon color="#E8E9ED" size="large" />}
                {!loading && lostList.length === 0 && foundList.length === 0 && (
                    <C.NoListArea>
                        <C.NoListText>
                            Não há itens perdidos ou recuperados.
                        </C.NoListText>
                    </C.NoListArea>
                )}
                {!loading && lostList.length > 0 && (
                    <>
                        <C.Title>Itens perdidos</C.Title>
                        <C.ProductScroller
                            horizontal={true}
                            showsHorizontalIndicator={false}>
                            {lostList.map((item, index) => (
                                <LostItem
                                    key={index}
                                    data={item}
                                    showButton={true}
                                    refreshFunction={getLostAndFound}
                                />
                            ))}
                        </C.ProductScroller>
                    </>
                )}
                {!loading && foundList.length > 0 && (
                    <>
                        <C.Title>Itens recuperados</C.Title>
                        <C.ProductScroller
                            horizontal={true}
                            showsHorizontalIndicator={false}>
                            {foundList.map((item, index) => (
                                <LostItem
                                    key={index}
                                    data={item}
                                    showButton={false}
                                />
                            ))}
                        </C.ProductScroller>
                    </>
                )}
            </C.Scroller>
        </C.Container>
    );
};
