import styled from 'styled-components/native';
import {useFonts} from 'expo-font';
import {Dimensions} from 'react-native';
import {theme} from '../themes/theme';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenHeight / 40;
const Container = styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    background-color: ${({theme}) => theme.dayBackground};
    height: ${screenHeight*0.60};
`;
const LocationContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    //padding-top: ${screenHeight/30}px;
`;
const LocationIcon = styled.Image`
    width: ${fontSize*1.5}px;
    height: ${fontSize*1.5}px;
`;
const Location = styled.Text`
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFMedium;
    color: ${({theme}) => theme.dayText};
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
    background-color: #B5E8FF;
    width: ${screenWidth*0.35}px;
    height: ${screenHeight*0.11}px;
    border-radius: 20px;
`;
const TemperatureCard = styled.View`
    background-color: #FEFF99;
    width: ${screenWidth*0.35}px;
    height: ${screenHeight*0.15}px;
    border-radius: 20px;
    margin-top: ${screenHeight*0.015}px;
    margin-bottom: ${screenHeight*0.015}px;
`;
const FinedustCard = styled.View`
    background-color: #F8B99B;
    width: ${screenWidth*0.35}px;
    height: ${screenHeight*0.11}px;
    border-radius: 20px;
`;
const WearCard = styled.TouchableOpacity`
    background-color: #C2C2FC;
    width: ${screenWidth*0.35}px;
    height: ${screenHeight*0.4}px;
    border-radius: 20px;
    elevation: 15;
    shadow-color: #000;
    shadow-opacity: 0.4;
    shadow-radius: 7px;
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
    background-color: ${({theme}) => theme.unselecIndic};
    border-radius: ${screenHeight*0.0075}px;
`;
const DateIndicator = styled.Text`
    font-family: GmarketSansTTFMedium;
    font-size: ${fontSize*0.6}px;
    color: ${({theme}) => theme.dayText};
    margin-bottom: ${fontSize*0.25}px;
`;

const BriefInfos = () => {
    const [fontsLoaded] = useFonts({
        "GmarketSansTTFMedium": require("../../assets/fonts/GmarketSansTTFMedium.ttf"),
        "GmarketSansTTFLight": require("../../assets/fonts/GmarketSansTTFLight.ttf")
    });

    if(!fontsLoaded) {
        return null;
    };

    return (
        <Container theme={theme}>
            <LocationContainer>
                <LocationIcon source={require('../../assets/icons/day_location.png')}/>
                <Location theme={theme}>성북구 삼성동</Location>
            </LocationContainer>
            <InfoCardContainer>
                <WeatherCardsContainer>
                    <PrecipitationPercentCard></PrecipitationPercentCard>
                    <TemperatureCard></TemperatureCard>
                    <FinedustCard></FinedustCard>
                </WeatherCardsContainer>
                <WearCard style={{shadow: { width:1, height: 2 }}}></WearCard>
            </InfoCardContainer>
            <IndicatorContainer>
                <Indicator>
                    <DateIndicator>yesterday</DateIndicator>
                    <IndicatorIcon />
                </Indicator>
                <Indicator>
                    <DateIndicator>today</DateIndicator>
                    <IndicatorIcon />
                </Indicator>
                <Indicator>
                    <DateIndicator>tomorrow</DateIndicator>
                    <IndicatorIcon />
                </Indicator>
            </IndicatorContainer>
        </Container>
    );
};

export default BriefInfos;