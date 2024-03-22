import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const modalWidth = Dimensions.get('window').width;
const modalHeight = Dimensions.get('window').height * 0.6;

const OthersContainer = styled.View`
    height: ${modalHeight-modalHeight/7-modalHeight/8}px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
`;
const OptionContainer = styled.View`
    height: ${(modalHeight-modalHeight/7-modalHeight/8)/6}px;
    width: ${modalWidth/2}px;
    align-items: center;
    flex-direction: row;
    padding-left: 30px;
`;
const Checkbox = styled.TouchableOpacity`
    height: ${(modalHeight-modalHeight/7-modalHeight/8)/7*0.45}px;
    width: ${(modalHeight-modalHeight/7-modalHeight/8)/7*0.45}px;
    border-radius: 3px;
    border-width: 3px;
    border-color: '#000';
`;
const CheckboxName = styled.Text`
    font-size: ${(modalHeight-modalHeight/7-modalHeight/8)/6*0.4}px;
    padding-left: 10px;
`;

const CommonFilter = ({ options, selectedOptions, onToggleOption }) => {
    return (
        <OthersContainer>
            {options.map((option, index) => (
                <OptionContainer key={index}>
                    <Checkbox 
                        onPress={() => onToggleOption(option)}
                        style={{
                            borderColor: selectedOptions[option.engName] ? '#3165F6' : '#000',
                        }} 
                    />
                    <CheckboxName style={{
                        color: selectedOptions[option.engName] ? '#3165F6' : '#000',
                    }}>
                        {option.korName}
                    </CheckboxName>
                </OptionContainer>
            ))}
        </OthersContainer>
    );
};

export default CommonFilter;