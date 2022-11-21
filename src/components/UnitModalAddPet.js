import React, {useState} from 'react';
import styled from 'styled-components/native';
import ValidatableTextInput from '../components/ValidatableTextInput';
import util from '../util/util';
import api from '../services/api';

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
    const [nameHasError, setNameHasError] = useState(false);
    const [race, setRace] = useState('');
    const [raceHasError, setRaceHasError] = useState(false);

    const handleAdd = async () => {
        let errorMessage = '';

        if (!name) {
            errorMessage += 'Digite o nome do pet.\n';
            setNameHasError(true);
        }

        if (!race) {
            errorMessage += 'Digite a raça do pet.\n';
            setRaceHasError(true);
        }

        if (errorMessage !== '') {
            util.showToastAlert('Atenção', errorMessage);
            return;
        }

        const result = await api.addUnitItem('pet', {name, race});

        if (result.error === '') {
            refreshFunction();
            setShowModal(false);
        } else {
            util.showToastAlert('Erro', result.error);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <Box>
            <Title>Adicionar novo pet</Title>

            <Label>Nome do pet:</Label>
            <ValidatableTextInput
                placeholder="Digite o nome do pet"
                value={name}
                onChangeTextAction={t => setName(t)}
                hasError={nameHasError}
                isRequired={true}
            />

            <Label>Raça do pet:</Label>
            <ValidatableTextInput
                placeholder="Digite a raça do pet"
                value={race}
                onChangeTextAction={t => setRace(t)}
                hasError={raceHasError}
                isRequired={true}
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
