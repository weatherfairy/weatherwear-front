import {useEffect} from 'react';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '../themes/theme';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TitleBar from '../components/TitleBar';
import BriefInfos from '../components/BriefInfos';
import ShortForecast from '../components/ShortForecast';
import WeekForecast from '../components/WeekForecast';

SplashScreen.preventAutoHideAsync();

const Container = styled.ScrollView`
    flex: 1;
    flex-direction: column;
    background-color: ${({theme}) => theme.dayBackground};
`;

const WeatherMain = () => {
    const [fontsLoaded] = useFonts({
        "GmarketSansTTFLight": require("../../assets/fonts/GmarketSansTTFLight.ttf")
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
    };
        
    return (
        <ThemeProvider theme={theme}>
            <TitleBar theme={theme} />
            <Container>
                <BriefInfos theme={theme} />
                <ShortForecast theme={theme} />
                <WeekForecast theme={theme} />
            </Container>
        </ThemeProvider>
    );
}

export default WeatherMain;