import * as React from 'react';
import styled from 'styled-components/native';
import {Dimensions, View, Text} from 'react-native';
import { Slider } from "@miblanchard/react-native-slider";

const modalHeight = Dimensions.get('window').height*0.65;


const TempFilterContainer = styled.View`
    height: ${(modalHeight-modalHeight/9-modalHeight/9)/7*6}px;
    flex-direction: column;
    align-items: stretch;
`;
const CustomThumb = () => (
    <View style={{
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowradius: 5,
        borderColor: '#D0D2D8',
        borderWidth: 0.35
    }}>
        <View style={{
            height: 17,
            width: 17,
            borderRadius: 8.5,
            backgroundColor: '#3165F6',
        }}/>
    </View>
);

const TempFilter = ({ values, onValuesChange }) => {
    const [sliderValue, setSliderValue] = React.useState([values.min, values.max]);

    const handleValueChange = (newValues) => {
        setSliderValue(newValues);
        onValuesChange({min: newValues[0], max: newValues[1]});
    };

    return (
        <TempFilterContainer>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: modalHeight / 17.5, paddingBottom: 10, paddingTop: 20 }}>
                    {`${sliderValue[0]}°C ~ ${sliderValue[1]}°C`}
                </Text>
            </View>
            <Slider
                animateTransitions
                maximumTrackTintColor="#d3d3d3"
                maximumValue={50}
                minimumTrackTintColor="#3165F6"
                minimumValue={-50}
                step={1}
                renderThumbComponent={CustomThumb}
                trackStyle={{height: 15}}
                value={sliderValue}
                onValueChange={handleValueChange}
            />
        </TempFilterContainer>
    )
};

export default TempFilter;