import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Navigation from './src/navigations';
import {ThemeProvider} from 'styled-components/native';
import {dayTheme, nightTheme} from './src/themes/theme';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(dayTheme);

  useEffect(() => {
      const currentTime = new Date().getHours();
      const isDayTime = currentTime >= 6 && currentTime < 18;

      setCurrentTheme(isDayTime ? dayTheme : nightTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <Navigation />
    </ThemeProvider>
  )
};

export default App;

//dev 저장을 위해 테스트로 주석 한 줄 추가