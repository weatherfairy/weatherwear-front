import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components/native';
import {dayTheme, nightTheme} from '../themes/theme';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { TitleBar, BriefInfos, ShortForecast, WeekForecast }from '../components';

SplashScreen.preventAutoHideAsync();

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;
const ScrollContainer = styled.ScrollView`
    flex: 1;
    flex-direction: column;
`;

const WeatherMain = ({navigation}) => {
            
    const [currentTheme, setCurrentTheme] = useState(dayTheme);

    useEffect(() => {
        const currentTime = new Date().getHours();
        const isDayTime = currentTime >= 6 && currentTime < 18;

        setCurrentTheme(isDayTime ? dayTheme : nightTheme);
    }, []);

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
        <ThemeProvider theme={currentTheme}>
            <Container>
                <TitleBar />
                <ScrollContainer>
                    <BriefInfos navigation={navigation} />
                    <ShortForecast />
                    <WeekForecast />
                </ScrollContainer>
            </Container>
        </ThemeProvider>
    );
}

export default WeatherMain;