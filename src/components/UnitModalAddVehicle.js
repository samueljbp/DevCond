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
    const [title, setTitle] = useState('');
    const [titleHasError, setTitleHasError] = useState(false);
    const [color, setColor] = useState('');
    const [colorHasError, setColorHasError] = useState(false);
    const [plate, setPlate] = useState('');
    const [plateHasError, setPlateHasError] = useState(false);

    const handleAdd = async () => {
        let errorMessage = '';

        if (!title) {
            errorMessage += 'Digite o nome do veículo.\n';
            setTitleHasError(true);
        }

        if (!color) {
            errorMessage += 'Digite a cor do veículo.\n';
            setColorHasError(true);
        }

        if (!plate) {
            errorMessage += 'Digite a placa do veículo.\n';
            setPlateHasError(true);
        }

        if (errorMessage !== '') {
            util.showToastAlert('Atenção', errorMessage);
            return;
        }

        const result = await api.addUnitItem('vehicle', {title, color, plate});

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
            <Title>Adicionar novo veículo</Title>

            <Label>Nome do veículo:</Label>
            <ValidatableTextInput
                placeholder="Digite o nome do veículo"
                value={title}
                onChangeTextAction={t => setTitle(t)}
                hasError={titleHasError}
                isRequired={true}
            />

            <Label>Cor do veículo:</Label>
            <ValidatableTextInput
                placeholder="Digite a cor do veículo"
                value={color}
                onChangeTextAction={t => setColor(t)}
                hasError={colorHasError}
                isRequired={true}
            />

            <Label>Placa do veículo:</Label>
            <ValidatableTextInput
                placeholder="Digite a placa do veículo"
                value={plate}
                onChangeTextAction={t => setPlate(t)}
                hasError={plateHasError}
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
