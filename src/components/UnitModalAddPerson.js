import React, {useState} from 'react';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';
import ValidatableTextInput from '../components/ValidatableTextInput';

const Box = styled.View`
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Label = styled.Text`
    font-size: 16px;
    color: #000;
    margin-bottom: 10px;
`;

const ButtonArea = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-top: 25px;
`;

const SaveButton = styled.Button`
    flex: 1;
`;

const CancelButton = styled.Button`
    flex: 1;
`;

export default ({refreshFunction, setShowModal}) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());

    const handleAdd = async () => {};

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <Box>
            <Title>Adicionar morador</Title>

            <Label>Nome completo:</Label>
            <ValidatableTextInput
                placeholder="Digite o nome completo"
                value={name}
                onChangeTextAction={t => setName(t)}
                isRequired={true}
            />

            <Label>Data de nascimento</Label>
            <DatePicker
                mode="date"
                date={date}
                onDateChange={setDate}
                locale="pt-BR"
            />

            <ButtonArea>
                <SaveButton title="Adicionar" onPress={handleAdd} />
                <CancelButton
                    color="#FF0000"
                    title="Cancelar"
                    onPress={handleCancel}
                />
            </ButtonArea>
        </Box>
    );
};
