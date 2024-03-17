import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Icon } from 'react-native-elements'; 
import { View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenHeight / 40;

const WeekForecastContainer = styled.View`
  background-color: ${({theme}) => theme.forecastContainer};
  align-items: center;
  opacity: 0.8;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.text};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: ${({top})=> top}px;
  left: ${({ left }) => left}px;
  font-size: ${({size})=>fontSize*size}px;
  font-family: GmarketSansTTFMedium;
  padding:10px;
`;

const AccordionItemContainer = styled.View`
  width: 88%;
  justify-content: space-between;
  margin: 20px 0;
`;


const AccordionContent = styled.View`
  width: 95%;
  align-items: center;
`;

const MediumText = styled.Text`
  font-size: 25px; 
  text-align: left;
  font-family: GmarketSansTTFMedium;
  color: ${({theme}) => theme.text};
`;
const LightText = styled.Text`
  font-size: 23px; 
  text-align: left;
  font-family: GmarketSansTTFLight;
  color: ${({theme}) => theme.text};
`;


const DetailItem = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  background-color: #f2f2f2;
`;

const DetailText = styled.Text`
  font-size: 20px;
  font-family: GmarketSansTTFLight;
  align-items: center;
`;
const AccordionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
`;



const WeatherIcon = ({ weatherType }) => {
  let iconSource;
  switch (weatherType) {
    case 'sunny':
      iconSource = require('../../assets/icons/sunny.png');
      break;
    case 'rainy':
      iconSource = require('../../assets/icons/rainy.png');
      break;
    case 'cloudy':
      iconSource = require('../../assets/icons/cloudy.png');
      break;
    default:
      iconSource = require('../../assets/icons/default.png');
  }

  return <Image source={iconSource} style={{ width: 40, height: 40 }} />;
};

const PrecipitationIcon = () => {
  return <Image source={require('../../assets/icons/precipitation.png')} style={{ width: 20, height: 20 }} />;
};

const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
  width: 70px;
`;

const HeaderContainer = styled.View`
  flex: 1;
  align-items: center;
`;
const IconActionContainer = styled.View`
  flex: 5; 
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const WeatherIconContainer = styled.View`
  margin-right: 13%;
`;


const PrecipitationContainer = styled.View`
  margin-right: 16%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
  width: 80px;
`;
const AccordionItem = ({ header, children, weatherType, maxTemp, minTemp, date, precipitation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useContext(ThemeContext);

  return (
    <AccordionItemContainer>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <AccordionHeader>
          <HeaderContainer>
            <MediumText>{header}</MediumText>
            <LightText> {date} </LightText>
          </HeaderContainer>
          <IconActionContainer>
            <WeatherIconContainer>
              <WeatherIcon weatherType={weatherType} />
            </WeatherIconContainer>
            <PrecipitationContainer>
              <PrecipitationIcon />
              <MediumText>{precipitation}%</MediumText>
            </PrecipitationContainer>
            <MediumText>{minTemp}°/</MediumText>
            <MediumText>{maxTemp}°</MediumText>
            <Icon
              name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              type="material"
              size={24}
              color={theme.highlight}
            />
          </IconActionContainer>
        </AccordionHeader>
      </TouchableOpacity>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionItemContainer>
  );
};

const DetailContainer = ({ times }) => {
  return (
    <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
      {times.map((slot, index) => (
        <View key={index} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: 5, borderRadius: 10, backgroundColor: '#f2f2f2' }}>
          <Text style={{ fontSize: 20, fontFamily: 'GmarketSansTTFLight' }}>
            {slot.time}
          </Text>
          <Image source={slot.image} style={{ width: 25, height: 25 }} />
          <View style={{ backgroundColor: 'skyblue', width: 100, height: 6 }}/>
          <Text style={{ fontSize: 20, fontFamily: 'GmarketSansTTFLight' }}>
            {slot.temp}°C
          </Text>
        </View>
      ))}
    </View>
  );
};




const WeekForecast = () => {
  return (
    <WeekForecastContainer>
      <TitleContainer>
        <Title top={10} left={9} size={1.2}>주간예보</Title>
        <Title top={23} left={screenWidth-120} size={0.8}>최고/최저</Title>
      </TitleContainer>
      <AccordionItem header={<MediumText>어제</MediumText>} weatherType={"sunny"} minTemp={-6} maxTemp={1} date = {"1/9"} precipitation={10}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>

      <AccordionItem header={<MediumText>오늘</MediumText>} weatherType={"cloudy"} minTemp={-8} maxTemp={0} date = {"1/10"} precipitation={70}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>

      <AccordionItem header={<MediumText>월</MediumText>} weatherType={"rainy"} minTemp={-7} maxTemp={3} date = {"1/11"} precipitation={80}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>
            
      <AccordionItem header={<MediumText>화</MediumText>} weatherType={"sunny"} minTemp={-7} maxTemp={3} date = {"1/12"} precipitation={80}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>
            
      <AccordionItem header={<MediumText>수</MediumText>} weatherType={"rainy"} minTemp={-7} maxTemp={3} date = {"1/13"} precipitation={80}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>
            
      <AccordionItem header={<MediumText>목</MediumText>} weatherType={"rainy"} minTemp={-7} maxTemp={3} date = {"1/14"} precipitation={80}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>
            
      <AccordionItem header={<MediumText>금</MediumText>} weatherType={"sunny"} minTemp={-7} maxTemp={3} date = {"1/15"} precipitation={80}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>
            
      <AccordionItem header={<MediumText>토</MediumText>} weatherType={"sunny"} minTemp={-7} maxTemp={3} date = {"1/16"} precipitation={80}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>
            

      <AccordionItem header={<MediumText>일</MediumText>} weatherType={"cloudy"} minTemp={-7} maxTemp={3} date = {"1/17"} precipitation={80}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>
            

      <AccordionItem header={<MediumText>월</MediumText>} weatherType={"rainy"} minTemp={-7} maxTemp={3} date = {"1/18"} precipitation={80}>
        <DetailContainer 
          times={[
          { time: "오전 3시", image: require('../../assets/icons/day_clear.png'), temp: "-5" },
          { time: "오전 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 3시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 6시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오후 9시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          { time: "오전 12시", image: require('../../assets/icons/day_clear.png'), temp: "-6" }, 
          ]} 
        />
      </AccordionItem>
            

            
    </WeekForecastContainer>
  );
};

export default WeekForecast;