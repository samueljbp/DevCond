import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import api from '../services/api';
import util from '../util/util';

const Box = styled.View`
    width: 200px;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 5px;
    background-color: #fff;
    margin-right: 20px;
`;

const Photo = styled.Image`
    height: 150px;
    border-radius: 5px;
`;

const Title = styled.Text`
    font-size: 15px;
    margin: 10px;
    height: 50px;
`;

const InfoTitle = styled.Text`
    font-weight: bold;
    color: #9c9db9;
    margin: 10px 10px 0 10px;
`;

const InfoText = styled.Text`
    font-weight: bold;
    color: #000;
    margin: 0 10px 10px 10px;
`;

const MineButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #8b63e7;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
`;

const MineButtonText = styled.Text`
    color: #fff;
    font-weight: bold;
    margin-left: 10px;
`;

export default ({data, showButton, refreshFunction}) => {
    const handleIsMine = () => {
        Alert.alert('Confirmação', 'Tem certeza que este item é seu?', [
            {text: 'Sim, é meu', onPress: handleSetRecovered},
            {text: 'Cancelar', onPress: null, styled: 'cancel'},
        ]);
    };

    const handleSetRecovered = async () => {
        const result = await api.setRecovered(data.id);
        if (result.error === '') {
            util.showToastAlert(
                'Atenção',
                'Pegue seu item perdido na portaria.',
            );
            refreshFunction();
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    return (
        <Box>
            <Photo source={{uri: data.photo}} resizeMode="cover" />
            <Title>{data.description}</Title>
            <InfoTitle>Encontrado em</InfoTitle>
            <InfoText>{data.where}</InfoText>
            <InfoTitle>Data</InfoTitle>
            <InfoText>{data.datecreated}</InfoText>

            {showButton && (
                <MineButton onPress={handleIsMine}>
                    <Icon name="hand-pointer-o" size={24} color="#FFF" />
                    <MineButtonText>É meu</MineButtonText>
                </MineButton>
            )}
        </Box>
    );
};
