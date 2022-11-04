import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import api from '../services/api';
import util from '../util/util';

const Box = styled.View``;

const Item = styled.View`
    background-color: #fff;
    border-width: 1px;
    border-color: #e8e9ed;
    border-radius: 5px;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`;

const InfoArea = styled.View`
    flex: 1;
`;

const StrongText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #000;
`;

const RegularText = styled.Text`
    font-size: 14px;
    color: #9c9db9;
`;

const RemoveButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
`;

export default ({list, refreshFunction}) => {
    const handleRemove = index => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este veículo?',
            [
                {text: 'Sim', onPress: () => removeItem(index)},
                {text: 'Cancelar', onPress: null, styled: 'cancel'},
            ],
        );
    };

    const removeItem = async index => {
        let result = await api.removeUnitItem('vehicle', list[index].id);

        if (result.error === '') {
            refreshFunction();
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    return (
        <Box>
            {list.map((item, index) => (
                <Item key={index}>
                    <InfoArea>
                        <StrongText>{item.title}</StrongText>
                        <RegularText>
                            Cor: {item.color} - Placa: {item.plate}
                        </RegularText>
                    </InfoArea>
                    <RemoveButton onPress={() => handleRemove(index)}>
                        <Icon name="remove" size={24} color="#FF0000" />
                    </RemoveButton>
                </Item>
            ))}
        </Box>
    );
};
