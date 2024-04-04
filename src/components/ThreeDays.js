import styled from 'styled-components/native';
import {theme} from '../themes/theme';
import {Dimensions, Text} from 'react-native';
import React from 'react';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenWidth/25;

const ShortForecastContainer = styled.ScrollView.attrs(() => ({
    horizontal: true,
    showsHorizontalScrollIndicator: true
}))`
    //flex-direction: column;
    //background-color: ${({theme}) => theme.forecastContainer};
    height: ${screenHeight*0.5}px;
    //opacity: 0.8;
    margin-bottom: ${screenHeight*0.05}px;
`;
const Container = styled.View`
    flex-direction: column;
    justify-content: space-around;
    height: ${screenHeight*0.5}px;
`;
const YesterdayContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.15}px;
    align-items: center;
    padding-left: 2px;
`;
const YesterdayBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.15}px;
    background-color: ${({theme}) => theme.yesterdayBox};
    border-radius: 10px;
    margin-left: 3px;
`;
const TodayContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    align-items: center;
    padding-left: 2px;
`;
const TodayBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    background-color: ${({theme}) => theme.todayBox};
    border-radius: 10px;
    margin-left: 3px;
`;
const TomorrowContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    align-items: center;
    padding-left: 2px;
`;
const TomorrowBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    background-color: ${({theme}) => theme.tomorrowBox};
    border-radius: 10px;
    margin-left: 3px;
`;
const DateText = styled.Text`
    color: ${({theme}) => theme.text};
    font-family: GmarketSansTTFLight;
`;
const InnerContainer = styled.View`
    flex: 1;
    justify-content: center;
    height: ${screenHeight/4.5/3}px;
`;
const OneHourContainer = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: ${screenHeight*0.12}px;
    width: ${screenWidth/5}px;
`;
const SkyInnerContainer = styled.View`
    justify-content: center;
    align-items: center;
    height: ${screenHeight/4.5/3*2}px;
`;
const HourInnerContainer = styled.View`
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
            case 1: return require('../../assets/icons/black_weather/clear_day.png');
            case 4: return require('../../assets/icons/black_weather/cloudy_day.png');
            case 2: return require('../../assets/icons/black_weather/rain.png');
            case 3: return require('../../assets/icons/black_weather/snow.png');
            case 5: return require('../../assets/icons/black_weather/overcast.png');
            case 6: return require('../../assets/icons/black_weather/sleet.png');
            case 7: return require('../../assets/icons/black_weather/windy.png');
            default: return require('../../assets/icons/black_weather/clear_day.png');
        }
    } else {
        switch(sky) {
            case 1: return require('../../assets/icons/white_weather/clear_night.png');
            case 4: return require('../../assets/icons/white_weather/cloudy_night.png');
            case 2: return require('../../assets/icons/white_weather/rain.png');
            case 3: return require('../../assets/icons/white_weather/snow.png');
            case 5: return require('../../assets/icons/white_weather/overcast.png');
            case 6: return require('../../assets/icons/white_weather/sleet.png');
            case 7: return require('../../assets/icons/white_weather/windy.png');
            default: return require('../../assets/icons/white_weather/clear_night.png');
        }
    }
};

const ThreeDays = ({data}) => {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >=6 && currentHour < 18;

    return (
        <ShortForecastContainer>
            <Container>
                <YesterdayContainer>
                    <DateText>어제</DateText>
                    <YesterdayBox>
                        {data.temp_array_yesterday.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <InnerContainer><Hour>{index+1}</Hour></InnerContainer>
                                <InnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky_array_yesterday[index], isDayTime)} 
                                    />
                                </InnerContainer>
                                <InnerContainer><Temperature>{temp}°C</Temperature></InnerContainer>
                            </OneHourContainer>
                        ))}
                    </YesterdayBox>
                </YesterdayContainer>
                <TodayContainer>
                    <DateText>오늘</DateText>
                    <TodayBox>
                        {data.temp_array_today.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <SkyInnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky_array_today[index], isDayTime)} 
                                    />
                                </SkyInnerContainer>
                                <HourInnerContainer><Temperature>{temp}°C</Temperature></HourInnerContainer>
                            </OneHourContainer>
                        ))}
                    </TodayBox>
                </TodayContainer>
                <TomorrowContainer>
                    <DateText>내일</DateText>
                    <TomorrowBox>
                        {data.temp_array_tomorrow.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <SkyInnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky_array_tomorrow[index], isDayTime)} 
                                    />
                                </SkyInnerContainer>
                                <HourInnerContainer><Temperature>{temp}°C</Temperature></HourInnerContainer>
                            </OneHourContainer>
                        ))}
                    </TomorrowBox>
                </TomorrowContainer>
            </Container>
        </ShortForecastContainer>
    );
};

export default ThreeDays;