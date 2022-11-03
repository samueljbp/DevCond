import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

const Input = styled.TextInput`
    border: 1px;
    border-color: ${props => {
        return props.hasError ? '#FF0000' : '#CCC';
    }};
    background-color: #fff;
    border-radius: 5px;
    color: #000;
    font-size: 15px;
    padding: 10px;
    margin-bottom: 15px;
`;

export default props => {
    const [hasError, setHasError] = useState();

    useEffect(() => {
        if (props.isRequired && props.value === '') {
            setHasError(true);
            return;
        }
        setHasError(false);
    }, [props.value]);

    useEffect(() => {
        if (props.hasError) {
            setHasError(true);
            return;
        }
        setHasError(false);
    }, [props.hasError]);

    useEffect(() => {
        setHasError(false);
    }, []);

    return (
        <Input
            hasError={hasError}
            placeholder={props.placeholder}
            onChangeText={props.onChangeTextAction}
            value={props.value}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
        />
    );
};
