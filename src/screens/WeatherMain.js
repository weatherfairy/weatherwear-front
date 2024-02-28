import {useEffect} from 'react';
import {Platform, StatusBar, Dimensions} from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from '../themes/theme';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
const screenHeight = Dimensions.get('window').height;
const fontSize = screenHeight / 35;
const Container = styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    background-color: ${({theme}) => theme.dayBackground};
`;
const TitleBar = styled.SafeAreaView`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({theme}) => theme.dayBackground};
    padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight*1.2 : 0}px;
    padding-left: ${StatusBar.currentHeight*0.4}px;
    padding-right: ${StatusBar.currentHeight*0.4}px;
`;
const UserCircle = styled.Image`
    width: ${fontSize*1.3}px;
    height: ${fontSize*1.3}px;
`;
const Title = styled.Text`
    font-size: ${fontSize}px;
    fontFamily: GmarketSansTTFBold;
    color: ${({theme}) => theme.dayText};
`;

const WeatherMain = () => {
    const [fontsLoaded] = useFonts({
        "GmarketSansTTFBold": require("../../assets/fonts/GmarketSansTTFBold.ttf"),
        "GmarketSansTTFLight": require("../../assets/fonts/GmarketSansTTFLight.ttf"),
        "GmarketSansTTFMedium": require("../../assets/fonts/GmarketSansTTFMedium.ttf")
    });

    useEffect(() => {
        async function hideSplashScreen() {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        }

        hideSplashScreen();
    }, [fontsLoaded]);

    if(!fontsLoaded) {
        return null;
    }
        
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TitleBar>
                    <Title>Weather Wear</Title>
                    <UserCircle source={require('../../assets/icons/user.png')} />
                </TitleBar>
            </Container>
        </ThemeProvider>
    );
}

export default WeatherMain;