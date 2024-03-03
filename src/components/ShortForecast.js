import styled from 'styled-components/native';
import {theme} from '../themes/theme';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const ShortForecastContainer = styled.View`
    background-color: ${({theme}) => theme.dayForecastContainer};
    height: ${screenHeight/4};
    opacity: 0.8;
    margin-top: ${screenHeight*0.02}px;
    margin-bottom: ${screenHeight*0.05}px;
`;

const ShortForecast = () => {
    return (
        <ShortForecastContainer theme={theme}/>
    );
};

export default ShortForecast;