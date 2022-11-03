import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import util from '../../util/util';
import ValidatableTextInput from '../../components/ValidatableTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera} from 'react-native-image-picker';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [photo, setPhoto] = useState({uri: ''});
    const [description, setDescription] = useState('');
    const [descHasError, setDescHasError] = useState(false);
    const [where, setWhere] = useState('');
    const [whereHasError, setWhereHasError] = useState(false);

    const handleSaveItem = async () => {
        let errorMessage = '';

        if (description === '') {
            errorMessage += 'Descreva o item\n';
            setDescHasError(true);
        }

        if (where === '') {
            errorMessage += 'Diga onde o item foi encontrado\n';
            setWhereHasError(true);
        }

        if (photo.uri === '') {
            errorMessage += 'Tire uma foto do item\n';
        }

        if (errorMessage !== '') {
            util.showToastAlert('Atenção', errorMessage);
            return;
        }

        const result = await api.addLostItem(photo, description, where);

        if (result.error === '') {
            navigation.navigate('LostAndFoundScreen');
            resetFields();
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <C.BackArea
                    onPress={() => navigation.navigate('LostAndFoundScreen')}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </C.BackArea>
            ),
        });
    }, []);

    const resetFields = () => {
        setPhoto({uri: ''});
        setDescription('');
        setWhere('');
    };

    const handleAddPhoto = () => {
        launchCamera(
            {
                mediaType: 'photo',
                maxWidth: 1280,
            },
            response => {
                if (!response.didCancel) {
                    setPhoto(response.assets[0]);
                }
            },
        );
    };

    return (
        <C.Container>
            <C.Scroller>
                <C.PhotoArea>
                    {!photo.uri && (
                        <C.ButtonArea onPress={handleAddPhoto}>
                            <Icon name="camera" size={15} color="#FFF" />
                            <C.ButtonText>Tirar uma foto</C.ButtonText>
                        </C.ButtonArea>
                    )}
                    {photo.uri && (
                        <>
                            <C.PhotoItem
                                source={{uri: photo.uri}}
                                resizeMode="cover"
                            />
                            <C.ButtonArea onPress={handleAddPhoto}>
                                <Icon name="camera" size={15} color="#FFF" />
                                <C.ButtonText>
                                    Tirar a foto novamente
                                </C.ButtonText>
                            </C.ButtonArea>
                        </>
                    )}
                </C.PhotoArea>

                <C.Title>Descreva o item</C.Title>
                <ValidatableTextInput
                    placeholder="Ex: carteira de couro da marca XPTO"
                    value={description}
                    onChangeTextAction={t => setDescription(t)}
                    isRequired={true}
                    hasError={descHasError}
                />

                <C.Title>Onde foi encontrado?</C.Title>
                <ValidatableTextInput
                    placeholder="Ex: no pátio B"
                    value={where}
                    onChangeTextAction={t => setWhere(t)}
                    isRequired={true}
                    hasError={whereHasError}
                />

                <C.ButtonArea onPress={handleSaveItem}>
                    <C.ButtonText>Salvar</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller>
        </C.Container>
    );
};
