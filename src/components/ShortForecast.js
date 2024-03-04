import styled from 'styled-components/native';
import {theme} from '../themes/theme';
import {Dimensions} from 'react-native';
import {useFonts} from 'expo-font';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenWidth/25;

const ShortForecastContainer = styled.ScrollView.attrs(() => ({
    horizontal: true,
    showsHorizontalScrollIndicator: true
}))`
    flex-direction: row;
    background-color: ${({theme}) => theme.dayForecastContainer};
    height: ${screenHeight/4.5};
    opacity: 0.8;
    margin-top: ${screenHeight*0.02}px;
    margin-bottom: ${screenHeight*0.05}px;
`;
const OneHourContainer = styled.View`
    flex-direction: column;
    align-items: center;
    height: ${screenHeight/4.5};
    width: ${screenWidth/8};
`;
const Hour = styled.Text`
    flex: 1;
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFMedium;
    color: ${({theme}) => theme.dayText};
`
const Sky = styled.Image`

    width: ${fontSize*2}px;
    height: ${fontSize*2}px;
`;
const Temperature = styled.Text`
    flex: 1;
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFMedium;
    color: ${({theme}) => theme.dayText};
`;

const ShortForecast = () => {
    const [fontsLoaded] = useFonts({
        "GmarketSansTTFMedium": require("../../assets/fonts/GmarketSansTTFMedium.ttf"),
    });
    let hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

    if(!fontsLoaded) {
        return null;
    };

    return (
        <ShortForecastContainer theme={theme}>
            {hours.map((hour) => (
                <OneHourContainer key={hour}>
                    <Hour>{hour}</Hour>
                    <Sky source={require('../../assets/icons/day_clear.png')} />
                    <Temperature>5°C</Temperature>
                </OneHourContainer>
            ))}
        </ShortForecastContainer>
    );
};

export default ShortForecast;