import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text, Image, Dimensions, View } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const fontSize = screenHeight / 50;

const WeekForecastContainer = styled.View`
  align-items: center;
  border-bottom-color: ${({ theme }) => theme.Forecast};  
  width: 100%;
  //height: ${screenHeight};
  background-color: ${({theme}) => theme.forecastContainer};
`;

const TitleContainer = styled.View`
  width: 96%;
  height: ${screenHeight * 0.05}px;
  margin: 2%;
  flex-direction: row;          
  align-items: flex-end;   
  justify-content: space-between;  
  border-bottom-width: 1px; 
  border-bottom-color: ${({ theme }) => theme.text};  
  border-bottom-style: solid; 
`;

const FlexContainer = styled.View`
  flex: 1;  
  align-items: center;  
  justify-content: center;  
  
  margin-bottom:5px;
`;

const DayForecast = styled.View`
  width: 96%;
  margin: 2%;
  padding: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  
  //background-color: skyblue;
`;
const DateContainer = styled.View`
  flex: 0.8;
  justify-content: center; 
  margin-left: -10px;
  align-items: center;
`;

const WeatherInfoContainer = styled.View`
  flex: 0.9; 
  flex-direction: row;
  align-items: center;
  //background-color: pink;

`;
const TemperatureContainer = styled.View`
  flex: 1.3;
  align-items : center;
  //background-color: orange;
`;

const PrecipitationContainer = styled.View`
  margin-right: 8px; 
`;

const WeatherIconContainer = styled.View`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;



const WeatherIcon = ({ weatherType }) => {
  const iconMap = {
    thunderstorm: require('../../assets/icons/color_weather/thunderstorm.png'),
    rain: require('../../assets/icons/color_weather/rain.png'),
    snow: require('../../assets/icons/color_weather/snow.png'),
    overcast: require('../../assets/icons/color_weather/overcast.png'),
    clear_day: require('../../assets/icons/color_weather/clear_day.png'),
    clear_night: require('../../assets/icons/color_weather/clear_night.png'),
    default: require('../../assets/icons/default.png'),
  };
  

  return <Image source={iconMap[weatherType]} style={{ width: 40, height: 40 }} />;
};

const weatherTypeFromCode = (code, time) => {
  switch (code) {
    case 2:
      return 'thunderstorm';
    case 3:
    case 5:
      return 'rain';
    case 6:
      return 'snow';
    case 7:
      return 'overcast';
    case 8:
      return time === 'am' ? 'clear_day' : 'clear_night';
    default:
      return 'default';
  }
};


const generateDates = () => {
  const dates = [];
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  for (let i = 0; i < 8; i++) {
    const newDate = new Date(today);
    newDate.setDate(newDate.getDate() + i);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const weekDay = weekDays[newDate.getDay()];
    dates.push({ fullDate: `${month}/${day}`, weekDay });
  }
  return dates;
};

const StyledText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: ${({ size }) => size || fontSize}px;
  font-family: GmarketSansTTFLight;
  
`;




const WeekForecast = ({ forecastData }) => {
  const dates = generateDates(); // 날짜 생성

  return (
    <WeekForecastContainer>
      <TitleContainer>
      <FlexContainer>
        <StyledText size={fontSize * 1.3}>주간예보</StyledText>
      </FlexContainer>
      <FlexContainer>
      </FlexContainer>
      <FlexContainer>
        <StyledText size={fontSize * 0.8}>강수확률(%)</StyledText>
      </FlexContainer>
      <FlexContainer>
        <StyledText size={fontSize}>최저/최고</StyledText>
      </FlexContainer>
    </TitleContainer>
      <ScrollView>
        {dates.map((date, index) => (
          <DayForecast key={index}>
          <DateContainer>
            <StyledText size={fontSize}>{date.weekDay}</StyledText>
            <StyledText size={fontSize * 1.2}>{date.fullDate}</StyledText>
          </DateContainer>

          <WeatherInfoContainer>
            <PrecipitationContainer>
              <StyledText size={fontSize * 0.8}>오전</StyledText>
              <StyledText size={fontSize}>{`${parseInt(forecastData.weeklyRainDay[index])}%`}</StyledText>
            </PrecipitationContainer>
            <WeatherIconContainer>
              <WeatherIcon weatherType={weatherTypeFromCode(forecastData.weeklySkyDay[index],'am')} />
            </WeatherIconContainer>
          </WeatherInfoContainer>

          <WeatherInfoContainer>
            <PrecipitationContainer>
              <StyledText size={fontSize * 0.8}>오후</StyledText>
              <StyledText size={fontSize}>{`${parseInt(forecastData.weeklyRainNight[index])}%`}</StyledText>
            </PrecipitationContainer>
            <WeatherIconContainer>
              <WeatherIcon weatherType={weatherTypeFromCode(forecastData.weeklySkyNight[index],'pm')} />
            </WeatherIconContainer>
          </WeatherInfoContainer>

          <TemperatureContainer>
            <StyledText size={fontSize * 1.5}>
              {`${parseInt(forecastData.minTemp[index])}° / ${parseInt(forecastData.maxTemp[index])}°`}
            </StyledText>
          </TemperatureContainer>
        </DayForecast>
        ))}
      </ScrollView>
    </WeekForecastContainer>
  );
};

export default WeekForecast;
