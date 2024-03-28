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
    height: ${screenHeight*0.6}px;
`;
const LocationContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const LocationIcon = styled(Octicons).attrs(({theme}) => ({
    name: 'location',
    size: fontSize*1.5,
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
    padding-top: ${screenHeight/40}px;
    padding-left: ${screenWidth*0.135}px;
    padding-right: ${screenWidth*0.135}px;
`;
const WeatherCardsContainer = styled.View`
    flex:1;
    flex-direction: column;
    width: ${screenWidth*0.35}px;
    height: ${screenHeight*0.4}px;
`;
const PrecipitationPercentCard = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #B5E8FF;
    width: ${screenWidth*0.35}px;
    height: ${screenHeight*0.11}px;
    border-radius: 20px;
`;
const PrecipitaionTitle = styled.Text`
    font-size: ${fontSize*1.1}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-bottom: 7px;
`;
const PrecipitationPercent = styled.Text`
    font-size: ${fontSize*1.8}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
`;
const TemperatureCard = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FEFF99;
    width: ${screenWidth*0.35}px;
    height: ${screenHeight*0.15}px;
    border-radius: 20px;
    margin-top: ${screenHeight*0.015}px;
    margin-bottom: ${screenHeight*0.015}px;
`;
const Temperature = styled.Text`
    font-size: ${fontSize*1.5}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
    padding-bottom: 7px;
`;
const SkyImage = styled.Image`
    width: ${fontSize*3}px;
    height: ${fontSize*3}px;
`;
const FinedustCard = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F8B99B;
    width: ${screenWidth*0.35}px;
    height: ${screenHeight*0.11}px;
    border-radius: 20px;
`;
const FinedustTitle = styled.Text`
    font-size: ${fontSize*1.1}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-bottom: 7px;
`;
const Finedust = styled.Text`
    font-size: ${fontSize*1.8}px;
    font-family: GmarketSansTTFMedium;
    color: #000;
`;
const WearCard = styled.TouchableOpacity`
    flex-direction: column;
    background-color: #C2C2FC;
    width: ${screenWidth*0.35}px;
    height: ${screenHeight*0.4}px;
    border-radius: 20px;
    elevation: 12;
    shadow-color: ${({theme}) => theme.text};
    shadow-opacity: 0.3;
    shadow-radius: 5px;
`;
const ClothesContainer = styled.View`
    justify-content: center;
    align-items: center;
`;
const WearTitle = styled.Text`
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 10px;
    line-height: ${fontSize*1.2}px;
`;
const ClothesImage = styled.Image`
    width: ${fontSize*4.2}px;
    height: ${fontSize*4.2}px;
`;
const ClothesText = styled.Text`
    font-size: ${fontSize*0.7}px;
    font-family: GmarketSansTTFLight;
    color: #000;
    padding-top: 5px;
    padding-bottom: 8px;
`;
const IndicatorContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding-top: ${screenHeight/35}px;
    padding-left: ${screenHeight/15}px;
    padding-right: ${screenHeight/15}px;
`;
const Indicator = styled.View`
    flex-direction: column;
    align-items: center;
    width: ${screenWidth*0.22}px;
`;
const IndicatorIcon = styled.TouchableOpacity`
    width: ${screenWidth*0.22}px;
    height: ${screenHeight*0.015}px;
    background-color: ${({theme, selected}) => selected ? theme.selecIndic : theme.unselecIndic};
    border-radius: ${screenHeight*0.0075}px;
    elevation: 6;
    shadow-color: ${({theme}) => theme.text};
    shadow-opacity: 0.2;
    shadow-radius: 2px;
`;
const DateIndicator = styled.Text`
    font-family: GmarketSansTTFMedium;
    font-size: ${fontSize*0.6}px;
    color: ${({theme}) => theme.text};
    margin-bottom: ${fontSize*0.3}px;
`;

const BriefInfos = ({ data, navigation }) => {
    
    const [selectedIndicator, setSelectedIndicator] = useState(1);

    return (
        <Container>
            <LocationContainer>
                <LocationIcon />
                <Location>성북구 삼성동</Location>
            </LocationContainer>
            <InfoCardContainer>
                <WeatherCardsContainer>
                    <PrecipitationPercentCard>
                        <PrecipitaionTitle>강수확률</PrecipitaionTitle>
                        <PrecipitationPercent>{data.rain}</PrecipitationPercent>
                    </PrecipitationPercentCard>
                    <TemperatureCard>
                        <Temperature>{data.temp}°C</Temperature>
                        <SkyImage source={require('../../assets/icons/color_weather/snow.png')} />
                    </TemperatureCard>
                    <FinedustCard>
                        <FinedustTitle>미세먼지</FinedustTitle>
                        <Finedust>{data.dust}</Finedust>
                    </FinedustCard>
                </WeatherCardsContainer>
                <WearCard 
                    style={{shadow: { width:1, height: 2 }}}
                    onPress={() => navigation.navigate('WearMain')}
                >
                    <WearTitle>{"My\nCloset"}</WearTitle>
                    <ClothesContainer>
                        <ClothesImage source={require('../../assets/icons/clothes/top.png')} />
                        <ClothesText>민소매</ClothesText>
                        <ClothesImage source={require('../../assets/icons/clothes/bottom.png')} />
                        <ClothesText>반바지</ClothesText>
                    </ClothesContainer>
                </WearCard>
            </InfoCardContainer>
            <IndicatorContainer>
                {['yesterday', 'today', 'tomorrow'].map((label, index) => (
                    <Indicator key={label}>
                        <DateIndicator numberOfLines={1}>{label}</DateIndicator>
                        <IndicatorIcon
                            selected={selectedIndicator === index}
                            onPress={() => setSelectedIndicator(index)}
                        />
                    </Indicator>
                ))}
            </IndicatorContainer>
        </Container>
    );
};

export default BriefInfos;