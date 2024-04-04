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
    height: ${screenHeight*0.45}px;
    //opacity: 0.8;
    margin-bottom: ${screenHeight*0.05}px;
`;
const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    height: ${screenHeight*0.45}px;
`;
const HourContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.03}px;
    align-items: center;
`;
const HourBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.03}px;
    margin-left: 3px;
`;
const HourTextContainer = styled.View`
    align-items: center;
    height: ${screenHeight*0.03}px;
    width: ${screenWidth/4.5}px;
    padding-bottom: 7px;
`;
const YesterdayContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    align-items: center;
    margin-bottom: ${screenHeight*0.01}px;
`;
const YesterdayBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    background-color: ${({theme}) => theme.yesterdayBox};
    border-radius: 10px;
    align-items: center;
`;
const TodayContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    align-items: center;
    margin-bottom: ${screenHeight*0.01}px;
`;
const TodayBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    background-color: ${({theme}) => theme.todayBox};
    border-radius: 10px;
    align-items: center;
`;
const TomorrowContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    align-items: center;
    margin-bottom: ${screenHeight*0.01}px;
`;
const TomorrowBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.12}px;
    background-color: ${({theme}) => theme.tomorrowBox};
    border-radius: 10px;
    align-items: center;
`;
const DateText = styled.Text`
    color: ${({theme}) => theme.text};
    font-family: GmarketSansTTFLight;
    margin-left: 2px;
`;
const OneHourContainer = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: ${screenHeight*0.12}px;
    width: ${screenWidth/4.5}px;
    padding-bottom: 7px;
`;
const SkyInnerContainer = styled.View`
    justify-content: center;
    align-items: center;
    height: ${screenHeight*0.12/3*2}px;
`;
const TempInnerContainer = styled.View`
    justify-content: center;
    height: ${screenHeight*0.12/3}px;
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
                <HourContainer>
                    <HourBox>
                        <DateText style={{opacity:0}}>시간</DateText>
                        {['오전 3시', '오전 6시', '오전 9시', '오후 12시', '오후 3시', '오후 6시', '오후 9시', '오전 12시'].map((label, index) => (
                            <HourTextContainer key={label}>
                                <Hour>{label}</Hour>
                            </HourTextContainer>
                        ))}
                    </HourBox>
                </HourContainer>
                <YesterdayContainer>
                    <YesterdayBox>
                        <DateText>어제</DateText>
                        {data.temp_array_yesterday.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <SkyInnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky_array_yesterday[index], isDayTime)} 
                                    />
                                </SkyInnerContainer>
                                <TempInnerContainer><Temperature>{temp}°C</Temperature></TempInnerContainer>
                            </OneHourContainer>
                        ))}
                    </YesterdayBox>
                </YesterdayContainer>
                <TodayContainer>
                    <TodayBox>
                        <DateText>오늘</DateText>
                        {data.temp_array_today.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <SkyInnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky_array_today[index], isDayTime)} 
                                    />
                                </SkyInnerContainer>
                                <TempInnerContainer><Temperature>{temp}°C</Temperature></TempInnerContainer>
                            </OneHourContainer>
                        ))}
                    </TodayBox>
                </TodayContainer>
                <TomorrowContainer>
                    <TomorrowBox>
                        <DateText>내일</DateText>
                        {data.temp_array_tomorrow.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <SkyInnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky_array_tomorrow[index], isDayTime)} 
                                    />
                                </SkyInnerContainer>
                                <TempInnerContainer><Temperature>{temp}°C</Temperature></TempInnerContainer>
                            </OneHourContainer>
                        ))}
                    </TomorrowBox>
                </TomorrowContainer>
            </Container>
        </ShortForecastContainer>
    );
};

export default ThreeDays;