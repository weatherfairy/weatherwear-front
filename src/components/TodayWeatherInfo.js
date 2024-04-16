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
    height: ${screenHeight*0.38}px;
    width: ${screenWidth}px;
`;
const LocationButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    //margin-top: -10px;
    padding-bottom: 12px;
`;
const LocationContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    //margin-top: -10px;
    padding-bottom: 12px;
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
    align-items: center;
    height: ${screenHeight*0.3}px;
    padding-left: ${screenWidth*0.01}px;
    padding-right: ${screenWidth*0.01}px;
`;
const LeftCardsContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    width: ${screenWidth*0.24}px;
    height: ${screenHeight*0.3}px;
`;
const PrecipitationPercentCard = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FEFF99;
    width: ${screenWidth*0.225}px;
    height: ${screenHeight*0.13}px;
    border-radius: 15px;
    margin-bottom: ${screenHeight*0.01}px;
`;
const PrecipitaionTitle = styled.Text`
    font-size: ${fontSize*0.7}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-bottom: 7px;
`;
const PrecipitationPercent = styled.Text`
    font-size: ${fontSize*1.1}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
`;
const TemperatureCard = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${screenWidth*0.4}px;
    height: ${screenHeight*0.3}px;
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
    width: ${screenWidth*0.225}px;
    height: ${screenHeight*0.13}px;
    border-radius: 15px;
`;
const FinedustTitle = styled.Text`
    font-size: ${fontSize*0.7}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-bottom: 7px;
`;
const Finedust = styled.Text`
    font-size: ${fontSize*1.1}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
`;
const WearCard = styled.TouchableOpacity`
    justify-content: space-around;
    flex-direction: column;
    background-color: #C2C2FC;
    width: ${screenWidth*0.23}px;
    height: ${screenHeight*0.27}px;
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
    font-size: ${fontSize*0.67}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
    padding-top: 10px;
    padding-bottom: 20px;
    line-height: ${fontSize*1.2}px;
`;
const ClothesImage = styled.Image`
    width: ${fontSize*2.5}px;
    height: ${fontSize*2.5}px;
`;
const ClothesText = styled.Text`
    font-size: ${fontSize*0.6}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-top: 5px;
    padding-bottom: 8px;
`;
const GotoContainer = styled.View`
    justify-content: center;
    align-items: center;
`;
const GotoCloset = styled.Text`
    font-size: ${fontSize*0.75}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
    padding-bottom: 5px;
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
const bottomData = {
    0: { name: "기모하의", image: require('../../assets/icons/bottom/1.png') },
    1: { name: "리넨하의", image: require('../../assets/icons/bottom/2.png') },
    2: { name: "면바지", image: require('../../assets/icons/bottom/3.png') },
    3: { name: "반바지", image: require('../../assets/icons/bottom/4.png') },
    4: { name: "슬랙스", image: require('../../assets/icons/bottom/5.png') },
    5: { name: "짧은치마", image: require('../../assets/icons/bottom/6.png') },
    6: { name: "청바지", image: require('../../assets/icons/bottom/7.png') },
}
const topData = {
    0: { name: "가죽자켓", image: require('../../assets/icons/top/1.png') },
    1: { name: "기모상의", image: require('../../assets/icons/top/2.png') },
    2: { name: "누빔옷", image: require('../../assets/icons/top/3.png') },
    3: { name: "니트", image: require('../../assets/icons/top/4.png') },
    4: { name: "롱슬리브", image: require('../../assets/icons/top/5.png') },
    5: { name: "리넨의상", image: require('../../assets/icons/top/6.png') },
    6: { name: "맨투맨", image: require('../../assets/icons/top/7.png') },
    7: { name: "목도리", image: require('../../assets/icons/top/8.png') },
    8: { name: "민소매", image: require('../../assets/icons/top/9.png') },
    9: { name: "바시티자켓", image: require('../../assets/icons/top/10.png') },
    10: { name: "반팔", image: require('../../assets/icons/top/11.png') },
    11: { name: "블라우스", image: require('../../assets/icons/top/12.png') },
    12: { name: "야상", image: require('../../assets/icons/top/13.png') },
    13: { name: "얇은가디건", image: require('../../assets/icons/top/14.png') },
    14: { name: "얇은니트", image: require('../../assets/icons/top/15.png') },
    15: { name: "얇은셔츠", image: require('../../assets/icons/top/16.png') },
    16: { name: "코트", image: require('../../assets/icons/top/17.png') },
    17: { name: "트렌치코트", image: require('../../assets/icons/top/18.png') },
    18: { name: "패딩", image: require('../../assets/icons/top/19.png') },
}
const dustData = {
    0: '나쁨',
    1: '보통',
    2: '좋음'
}

const TodayWeatherInfo = ({ data, navigation, setModal, selectedRegion }) => {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18;

    return (
        <Container>
            <LocationButton onPress={setModal}>
                <LocationIcon />
                <Location>{selectedRegion}</Location>
            </LocationButton>
            <InfoCardContainer>
                <LeftCardsContainer>
                    <PrecipitationPercentCard>
                        <PrecipitaionTitle>강수확률</PrecipitaionTitle>
                        <PrecipitationPercent>{data.rain}%</PrecipitationPercent>
                    </PrecipitationPercentCard>
                    <FinedustCard>
                        <FinedustTitle>미세먼지</FinedustTitle>
                        <Finedust>{dustData[data.wind]}</Finedust>
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
                        <ClothesImage source={topData[data.top].image} />
                        <ClothesText>{topData[data.top].name}</ClothesText>
                        <ClothesImage source={bottomData[data.bottom].image} />
                        <ClothesText>{bottomData[data.bottom].name}</ClothesText>
                    </ClothesContainer>
                    <GotoContainer>
                        <GotoCloset>Click!</GotoCloset>
                    </GotoContainer>
                </WearCard>
            </InfoCardContainer>
        </Container>
    );
};

export default TodayWeatherInfo;