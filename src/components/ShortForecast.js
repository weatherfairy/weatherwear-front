import styled from 'styled-components/native';
import {theme} from '../themes/theme';
import {Dimensions} from 'react-native';
import React from 'react';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenWidth/25;

const ShortForecastContainer = styled.ScrollView.attrs(() => ({
    horizontal: true,
    showsHorizontalScrollIndicator: true
}))`
    flex-direction: row;
    background-color: ${({theme}) => theme.forecastContainer};
    height: ${screenHeight/4.5}px;
    opacity: 0.8;
    margin-top: ${screenHeight*0.02}px;
    margin-bottom: ${screenHeight*0.05}px;
`;
const OneHourContainer = styled.View`
    flex-direction: column;
    align-items: center;
    height: ${screenHeight/4.5}px;
    width: ${screenWidth/8}px;
`;
const InnerContainer = styled.View`
    flex: 1;
    justify-content: center;
    height: ${screenHeight/4.5/3}px;
`;
const Hour = styled.Text`
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFMedium;
    color: ${({theme}) => theme.text};
`
const Sky = styled.Image`
    width: ${fontSize*2}px;
    height: ${fontSize*2}px;
`;
const Temperature = styled.Text`
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFMedium;
    color: ${({theme}) => theme.text};
`;
const getWeatherIconPath = (sky, isDayTime) => {
    if (isDayTime) {
        switch(sky) {
            case 2: return require('../../assets/icons/black_weather/thunderstorm.png');
            case 3: return require('../../assets/icons/black_weather/rain.png');
            case 5: return require('../../assets/icons/black_weather/rain.png');
            case 6: return require('../../assets/icons/black_weather/snow.png');
            case 7: return require('../../assets/icons/black_weather/overcast.png');
            case 8: return require('../../assets/icons/black_weather/clear_day.png');
            default: return require('../../assets/icons/black_weather/clear_day.png');
        }
    } else {
        switch(sky) {
            case 2: return require('../../assets/icons/white_weather/thunderstorm.png');
            case 3: return require('../../assets/icons/white_weather/rain.png');
            case 5: return require('../../assets/icons/white_weather/rain.png');
            case 6: return require('../../assets/icons/white_weather/snow.png');
            case 7: return require('../../assets/icons/white_weather/overcast.png');
            case 8: return require('../../assets/icons/white_weather/clear_night.png');
            default: return require('../../assets/icons/white_weather/clear_night.png');
        }
    }
};

const ShortForecast = ({data}) => {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >=6 && currentHour < 18;

    return (
        <ShortForecastContainer>
            {data.temp_array.map((temp, index) => (
                <OneHourContainer key={index}>
                    <InnerContainer><Hour>{index+1}</Hour></InnerContainer>
                    <InnerContainer>
                        <Sky 
                            key={index}
                            source={getWeatherIconPath(data.sky_array[index], isDayTime)} 
                        />
                    </InnerContainer>
                    <InnerContainer><Temperature>{temp}°C</Temperature></InnerContainer>
                </OneHourContainer>
            ))}
        </ShortForecastContainer>
    );
};

export default ShortForecast;