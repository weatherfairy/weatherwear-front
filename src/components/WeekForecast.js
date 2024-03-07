import styled from 'styled-components/native';
import {theme} from '../themes/theme';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const WeekForecastContainer = styled.View`
    background-color: ${({theme}) => theme.forecastContainer};
    height: ${screenHeight};
    opacity: 0.8;
`;

const WeekForecast = () => {
    return (
        <WeekForecastContainer />
    );
};

export default WeekForecast;