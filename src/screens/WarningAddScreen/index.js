import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './styles';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../contexts/StateContext';
import ValidatableTextInput from '../../components/ValidatableTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera} from 'react-native-image-picker';
import util from '../../util/util';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [warnText, setWarnText] = useState('');
    const [warnHasError, setWarnHasError] = useState(false);
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAddPhoto = async () => {
        launchCamera(
            {
                mediaType: 'photo',
                maxWidth: 1280,
            },
            async response => {
                if (!response.didCancel) {
                    setLoading(true);
                    let result = await api.addWarningFile(response.assets[0]);
                    setLoading(false);
                    if (result.error === '') {
                        let list = [...photoList];
                        list.push(result.photo);
                        setPhotoList(list);
                    } else {
                        util.showToastAlert('Erro', result.error);
                    }
                }
            },
        );
    };

    const handleDelPhoto = url => {
        let list = [...photoList];
        list = list.filter(p => p !== url);
        setPhotoList(list);
    };

    const handleSaveWarn = async () => {
        if (warnText === '') {
            util.showToastAlert('Atenção', 'Descreva a ocorrência');
            setWarnHasError(true);
            return;
        }

        const result = await api.addWarning(warnText, photoList);

        if (result.error === '') {
            navigation.navigate('WarningScreen', {forceRefresh: true});
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    return (
        <C.Container>
            <C.Title>Descreva a ocorrência</C.Title>
            <ValidatableTextInput
                placeholder="Ex: Vizinho X está com som alto"
                value={warnText}
                onChangeTextAction={t => setWarnText(t)}
                isRequired={true}
                hasError={warnHasError}
            />

            <C.Title>Fotos relacionadas</C.Title>
            <C.PhotoArea>
                <C.PhotoScroll horizontal={true}>
                    <C.PhotoAddButton onPress={handleAddPhoto}>
                        <Icon name="camera" size={24} color="#000" />
                    </C.PhotoAddButton>
                    {photoList.map((item, index) => (
                        <C.PhotoItem key={index}>
                            <C.Photo source={{uri: item}} />
                            <C.PhotoRemoveButton
                                onPress={() => handleDelPhoto(item)}>
                                <Icon name="remove" size={16} color="#FF0000" />
                            </C.PhotoRemoveButton>
                        </C.PhotoItem>
                    ))}
                </C.PhotoScroll>
            </C.PhotoArea>
            {loading && (
                <C.LoadingText>Enviando a foto. Aguarde...</C.LoadingText>
            )}
            <C.ButtonArea onPress={handleSaveWarn}>
                <C.ButtonText>Salvar</C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    );
};
