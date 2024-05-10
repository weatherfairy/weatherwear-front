import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Navigation from './src/navigations';
import {ThemeProvider} from 'styled-components/native';
import {dayTheme, nightTheme} from './src/themes/theme';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AuthProvider from './src/contexts/Auth';

const fetchFonts = () => {
  return Font.loadAsync({
    'GmarketSansTTFBold': require('./assets/fonts/GmarketSansTTFBold.ttf'),
    'GmarketSansTTFLight': require('./assets/fonts/GmarketSansTTFLight.ttf'),
    'GmarketSansTTFMedium': require('./assets/fonts/GmarketSansTTFMedium.ttf'),
  });
};

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(dayTheme);
  const [fontLoaded, setFontLoaded] = useState(false);

  /*useEffect(() => {
      const currentTime = new Date().getHours();
      const isDayTime = currentTime >= 6 && currentTime < 18;

      setCurrentTheme(isDayTime ? dayTheme : nightTheme);
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setFontLoaded(true)} 
        onError={console.warn} 
      />
    );
  }*/
  useEffect(() => {
    async function prepare() {
      try {
        // 스플래시 스크린 유지
        await SplashScreen.preventAutoHideAsync();
        // 폰트 로딩
        await fetchFonts();
        setFontLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // 폰트 로딩 완료 후 스플래시 스크린 숨김
        await SplashScreen.hideAsync();
      }
    }

    prepare();

    const currentTime = new Date().getHours();
    const isDayTime = currentTime >= 6 && currentTime < 18;
    setCurrentTheme(isDayTime ? dayTheme : nightTheme);
  }, []);

  if (!fontLoaded) {
    // 폰트가 로드될 때까지 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <AuthProvider>
        <Navigation />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  )
};

export default App;
