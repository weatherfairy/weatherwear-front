import {useState} from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import { Octicons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenHeight / 40;
const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    height: ${screenHeight*0.35}px;
    width: ${screenWidth}px;
`;
const LocationContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: -10px;
`;
const LocationIcon = styled(Octicons).attrs(({theme}) => ({
    name: 'location',
    size: fontSize*1.4,
    color: theme.highlight
}))``;
const Location = styled.Text`
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFMedium;
    color: ${({theme}) => theme.text};
    padding-left:10px;
`;
const InfoCardContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    height: ${screenHeight*0.25}px;
    padding-top: ${screenHeight*0.01}px;
    padding-left: ${screenWidth*0.05}px;
    padding-right: ${screenWidth*0.05}px;
`;
const LeftCardsContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    width: ${screenWidth*0.2}px;
    height: ${screenHeight*0.25}px;
`;
const PrecipitationPercentCard = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FEFF99;
    width: ${screenWidth*0.2}px;
    height: ${screenHeight*0.12}px;
    border-radius: 15px;
`;
const PrecipitaionTitle = styled.Text`
    font-size: ${fontSize*0.9}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-bottom: 7px;
`;
const PrecipitationPercent = styled.Text`
    font-size: ${fontSize*1.2}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
`;
const TemperatureCard = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${screenWidth*0.45}px;
    height: ${screenHeight*0.25}px;
    padding-top: ${screenHeight*0.015}px;
    padding-bottom: ${screenHeight*0.015}px;
`;
const Temperature = styled.Text`
    font-size: ${fontSize*1.5}px;
    font-family: GmarketSansTTFMedium;
    color:${({theme}) => theme.text};
    padding-top: 25px;
`;
const SkyImage = styled.Image`
    width: ${fontSize*5}px;
    height: ${fontSize*5}px;
`;
const FinedustCard = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F8B99B;
    width: ${screenWidth*0.2}px;
    height: ${screenHeight*0.12}px;
    border-radius: 15px;
`;
const FinedustTitle = styled.Text`
    font-size: ${fontSize*0.9}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-bottom: 7px;
`;
const Finedust = styled.Text`
    font-size: ${fontSize*1.2}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
`;
const WearCard = styled.TouchableOpacity`
    flex-direction: column;
    background-color: #C2C2FC;
    width: ${screenWidth*0.2}px;
    height: ${screenHeight*0.25}px;
    border-radius: 15px;
    elevation: 10;
    shadow-color: ${({theme}) => theme.text};
    shadow-opacity: 0.3;
    shadow-radius: 3px;
`;
const ClothesContainer = styled.View`
    justify-content: center;
    align-items: center;
`;
const WearTitlecontainer = styled.View`
    justify-content: center;
    align-items: center;
`;
const WearTitle = styled.Text`
    font-size: ${fontSize*0.75}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
    padding-top: 10px;
    padding-bottom: 20px;
    line-height: ${fontSize*1.2}px;
`;
const ClothesImage = styled.Image`
    width: ${fontSize*2.1}px;
    height: ${fontSize*2.1}px;
`;
const ClothesText = styled.Text`
    font-size: ${fontSize*0.6}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-top: 5px;
    padding-bottom: 8px;
`;

const getSkyIcon = (sky, isDayTime) => {
    switch(sky) {
        case 1:
            return isDayTime 
                ? require('../../assets/icons/color_weather/clear_day.png') 
                : require('../../assets/icons/color_weather/clear_night.png');
        case 4:
            return isDayTime 
                ? require('../../assets/icons/color_weather/cloudy_day.png') 
                : require('../../assets/icons/color_weather/cloudy_night.png');
        case 2:
            return require('../../assets/icons/color_weather/rain.png');
        case 3:
            return require('../../assets/icons/color_weather/snow.png');
        case 5:
            return require('../../assets/icons/color_weather/overcast.png');
        case 6:
            return require('../../assets/icons/color_weather/sleet.png');
        case 7:
            return require('../../assets/icons/color_weather/windy.png');
        default:
            return isDayTime 
                ? require('../../assets/icons/color_weather/clear_day.png') // 기본 낮 아이콘
                : require('../../assets/icons/color_weather/clear_night.png'); // 기본 밤 아이콘
    }
};

const TodayWeatherInfos = ({ data, navigation, changeDate }) => {
    const [selectedIndicator, setSelectedIndicator] = useState(1);
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18;

    const handleDateChange = (index) => {
        setSelectedIndicator(index);
        const date = index === 0 ? 'yesterday' : index === 2 ? 'tomorrow' : 'today';
        changeDate(date);
    };

    return (
        <Container>
            <LocationContainer>
                <LocationIcon />
                <Location>성북구 삼성동</Location>
            </LocationContainer>
            <InfoCardContainer>
                <LeftCardsContainer>
                    <PrecipitationPercentCard>
                        <PrecipitaionTitle>강수확률</PrecipitaionTitle>
                        <PrecipitationPercent>{data.rain}</PrecipitationPercent>
                    </PrecipitationPercentCard>
                    <FinedustCard>
                        <FinedustTitle>미세먼지</FinedustTitle>
                        <Finedust>{data.dust}</Finedust>
                    </FinedustCard>
                </LeftCardsContainer>
                <TemperatureCard>
                    <SkyImage source={getSkyIcon(data.sky, isDayTime)} />
                    <Temperature>{data.temp}°C</Temperature>
                </TemperatureCard>
                <WearCard 
                    style={{shadow: { width:1, height: 2 }}}
                    onPress={() => navigation.navigate('WearMain')}
                >
                    <WearTitlecontainer>
                        <WearTitle>CLOSET</WearTitle>
                    </WearTitlecontainer>
                    <ClothesContainer>
                        <ClothesImage source={require('../../assets/icons/clothes/top.png')} />
                        <ClothesText>민소매</ClothesText>
                        <ClothesImage source={require('../../assets/icons/clothes/bottom.png')} />
                        <ClothesText>반바지</ClothesText>
                    </ClothesContainer>
                </WearCard>
            </InfoCardContainer>
        </Container>
    );
};

export default TodayWeatherInfos;