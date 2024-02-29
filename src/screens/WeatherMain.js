import {useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from '../themes/theme';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TitleBar from '../components/TitleBar';

SplashScreen.preventAutoHideAsync();
const Container = styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    background-color: ${({theme}) => theme.dayBackground};
`;

const WeatherMain = () => {
    const [fontsLoaded] = useFonts({
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
    };
        
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TitleBar theme={theme} />
            </Container>
        </ThemeProvider>
    );
}

export default WeatherMain;