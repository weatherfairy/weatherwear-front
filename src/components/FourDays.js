import styled from 'styled-components/native';
import {theme} from '../themes/theme';
import {Dimensions, Text} from 'react-native';
import React from 'react';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenWidth/30;

const ShortForecastContainer = styled.View`
    height: ${screenHeight*0.48}px;
    margin-bottom: ${screenHeight*0.05}px;
`;
const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${screenHeight*0.48}px;
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
    width: ${screenWidth/9}px;
    padding-bottom: 7px;
`;
const YesterdayContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.1}px;
    align-items: center;
    margin-bottom: ${screenHeight*0.01}px;
`;
const YesterdayBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.1}px;
    background-color: ${({theme}) => theme.yesterdayBox};
    width: ${screenWidth*0.95}px;
    border-radius: 10px;
    align-items: center;
`;
const TodayContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.1}px;
    align-items: center;
    margin-bottom: ${screenHeight*0.01}px;
`;
const TodayBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.1}px;
    background-color: ${({theme}) => theme.todayBox};
    width: ${screenWidth*0.95}px;
    border-radius: 10px;
    align-items: center;
`;
const TomorrowContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.1}px;
    align-items: center;
    margin-bottom: ${screenHeight*0.01}px;
`;
const TomorrowBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.1}px;
    background-color: ${({theme}) => theme.tomorrowBox};
    width: ${screenWidth*0.95}px;
    border-radius: 10px;
    align-items: center;
`;
const AfterTomorrowContainer = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.1}px;
    align-items: center;
    margin-bottom: ${screenHeight*0.01}px;
`;
const AfterTomorrowBox = styled.View`
    flex-direction: row;
    height: ${screenHeight*0.1}px;
    background-color: ${({theme}) => theme.aftertomorrowBox};
    width: ${screenWidth*0.95}px;
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
    height: ${screenHeight*0.1}px;
    width: ${screenWidth/9}px;
    padding-bottom: 7px;
`;
const SkyInnerContainer = styled.View`
    justify-content: center;
    align-items: center;
    height: ${screenHeight*0.1/3*2}px;
`;
const TempInnerContainer = styled.View`
    justify-content: center;
    height: ${screenHeight*0.1/3}px;
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

const FourDays = ({data}) => {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >=6 && currentHour < 18;

    return (
        <ShortForecastContainer>
            <Container>
                <HourContainer>
                    <HourBox>
                        <DateText>시각</DateText>
                        {['03', '06', '09', '12', '15', '18', '21', '24'].map((label, index) => (
                            <HourTextContainer key={label}>
                                <Hour>{label}</Hour>
                            </HourTextContainer>
                        ))}
                    </HourBox>
                </HourContainer>
                <YesterdayContainer>
                    <YesterdayBox>
                        <DateText>어제</DateText>
                        {data.temp1.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <SkyInnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky1[index], isDayTime)} 
                                    />
                                </SkyInnerContainer>
                                <TempInnerContainer><Temperature>{`${parseInt(temp)}°`}</Temperature></TempInnerContainer>
                            </OneHourContainer>
                        ))}
                    </YesterdayBox>
                </YesterdayContainer>
                <TodayContainer>
                    <TodayBox>
                        <DateText>오늘</DateText>
                        {data.temp2.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <SkyInnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky2[index], isDayTime)} 
                                    />
                                </SkyInnerContainer>
                                <TempInnerContainer><Temperature>{`${parseInt(temp)}°`}</Temperature></TempInnerContainer>
                            </OneHourContainer>
                        ))}
                    </TodayBox>
                </TodayContainer>
                <TomorrowContainer>
                    <TomorrowBox>
                        <DateText>내일</DateText>
                        {data.temp3.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <SkyInnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky3[index], isDayTime)} 
                                    />
                                </SkyInnerContainer>
                                <TempInnerContainer><Temperature>{`${parseInt(temp)}°`}</Temperature></TempInnerContainer>
                            </OneHourContainer>
                        ))}
                    </TomorrowBox>
                </TomorrowContainer>
                <AfterTomorrowContainer>
                    <AfterTomorrowBox>
                        <DateText>모레</DateText>
                        {data.temp4.map((temp, index) => (
                            <OneHourContainer key={index}>
                                <SkyInnerContainer>
                                    <Sky 
                                        key={index}
                                        source={getWeatherIconPath(data.sky4[index], isDayTime)} 
                                    />
                                </SkyInnerContainer>
                                <TempInnerContainer><Temperature>{`${parseInt(temp)}°`}</Temperature></TempInnerContainer>
                            </OneHourContainer>
                        ))}
                    </AfterTomorrowBox>
                </AfterTomorrowContainer>
            </Container>
        </ShortForecastContainer>
    );
};

export default FourDays;