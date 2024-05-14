import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as SplashScreen from 'expo-splash-screen';
import { WeekForecast, TodayWeatherInfos, FourDays, Location }from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const errorData = {
    temp: 0,
    rain: '0%',
    sky: 0,
    dust: 'error',
    top: 0,
    bottom: 0,
    temp_array: new Array(24).fill(0), // 24시간의 온도 모두 0으로 설정
    sky_array: new Array(24).fill(0),
    min_temp: new Array(11).fill(0),
    max_temp: new Array(11).fill(0)
};

const dummyData = {
    "temp": '12.7',
    "rain": '70',
    "wind": '12.45464',
    "sky": 2,
    "top": 4,
    "bottom": 2,

    //어제 데이터
    "temp1": ['10.1', '12.5', '11.0', '15.7', '17.9', '13.02', '14.0', '19.72'],
    "sky1": [3, 3, 3, 2, 2, 7, 7],

    //오늘 데이터
    "temp2": ['10.3', '13.5', '12.2', '16.7', '18.8', '11.2', '12.0', '17.2'],
    "sky2": [7, 7, 3, 2, 2, 7, 7],

    //내일 데이터
    "temp3": ['17.1', '19.5', '20.11', '17.7', '19.9', '16.02', '15.0', '19.7'],
    "sky3": [7, 8, 8, 8, 8, 8, 8],

    //모레 데이터
    "temp4": ['16.1', '12.5', '15.0', '15.7', '16.9', '12.7', '17.7', '16.1'],
    "sky4": [8, 8, 8, 8, 8, 8, 7],
    
    //주간 날씨에 보여지는 데이터
    "minTemp": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    "maxTemp": [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20],
    // "min_temp": ['10.1', '10.3', '15.0', '12.2', '13.0', '13.3', '14.9', '15.5'],
    // "max_temp": ['19.72', '19.2', '20.11', '18.3', '16.9', '17.2', '18.8', '17.6'],
    "weekly_rain": [10, 20, 30, 40, 50, 60, 70, 80, 90, 80, 70],
    "weeklyRainDay": ['80', '80', '10', '10', '20', '30', '30', '10'],
    "weeklyRainNight": ['70', '80', '10', '10', '30', '30', '20', '10'],
    "weeklySkyDay": [2, 3, 8, 8, 7, 7, 8, 7],
    "weeklySkyNight": [7, 7, 8, 8, 7, 7, 8, 8],
}
SplashScreen.preventAutoHideAsync();

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;
const ScrollContainer = styled.ScrollView`
    flex: 1;
    flex-direction: column;
`;

const saveTemperatureData = async(minTemp, maxTemp, skyIcon) =>{
    try{
        await AsyncStorage.setItem('minTemp' ,JSON.stringify(minTemp));
        await AsyncStorage.setItem('maxTemp', JSON.stringify(maxTemp));
        await AsyncStorage.setItem('skyIcon', JSON.stringify(skyIcon));
    }catch(error){
        console.error("failed to save Today-WeatherData", error);
    }
};

const WeatherMain = ({navigation}) => {
    //const [weatherData, setWeatherData] = useState();
    const [testData, setTestData] = useState(dummyData);

    //테스트용 더미 날씨데이터
    const weatherData = testData;
    //const weatherData = dummyData;
    
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('서울특별시 성북구');
    const [selectedMainRegion, setSelectedMainRegion] = useState(null);
    const [selectedSubRegion, setSelectedSubRegion] = useState(null);

    const toggleLocationModal = () => {
        setShowLocationModal(!showLocationModal);
    }

    const saveRegionToStorage = async (region) => {
        try {
            await AsyncStorage.setItem('location', region);
            setSelectedRegion(region);  // Update state after successful storage
            console.log('Region saved:', region);
        } catch (error) {
            console.error('Failed to save the region:', error);
        }
    };

    useEffect(() => {
        const fetchWeatherData = async() => {
            try {
                const locationParameter = `location=${selectedRegion.replace(/\s/g, '')}`;
                const url = `http://15.165.61.76:8080/api/v1/weathers?${locationParameter}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const jsonResponse = await response.json();
                console.log('url: ', url);
                console.log('response: ', jsonResponse);
                //console.log('rain: ', jsonResponse.rain);
                if (response.ok) {
                    //setWeatherData(jsonResponse.content);
                    setTestData(jsonResponse);
                    console.log('WeatherData set: ', jsonResponse);
                } else {
                    //setWeatherData(errorData);
                    setTestData(jsonResponse);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                //setWeatherData(errorData);
                setTestData(jsonResponse);
            }
        };
        fetchWeatherData();
    }, [selectedRegion]);

    useEffect(() => {
        const fetchWeatherData = async() => {
            try {
                const locationParameter = `location=${selectedRegion.replace(/\s/g, '')}`;
                const url = `http://15.165.61.76:8080/api/v1/weathers?${locationParameter}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const jsonResponse = await response.json();
                console.log('url: ', url);
                console.log('response: ', jsonResponse);
                //console.log('rain: ', jsonResponse.rain);
                if (response.ok) {
                    //setWeatherData(jsonResponse.content);
                    setTestData(jsonResponse);
                    console.log('WeatherData set: ', jsonResponse);

                    //글작성페이지에 보낼 데이터 추출/저장
                    const minTemp = parseInt(jsonResponse.minTemp[0]);
                    const maxTemp = parseInt(jsonResponse.maxTemp[0]);
                    const skyIcon = jsonResponse.weeklySkyDay[0];
                    saveTemperatureData(minTemp, maxTemp, skyIcon);
                    //console.log(minTemp);
                } else {
                    //setWeatherData(errorData);
                    setTestData(jsonResponse);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                //setWeatherData(errorData);
                setTestData(jsonResponse);
            }
        };
        fetchWeatherData();
    }, [selectedRegion]);

    return (
            /*<Container>
                <ScrollContainer>
                    <BriefInfos data={weatherData} navigation={navigation} changeDate={setSelectedDate}/>
                    <ShortForecast data={weatherData} />
                    <WeekForecast />
                </ScrollContainer>
            </Container>*/
        <Container>
            <ScrollContainer>
                <TodayWeatherInfos 
                    data={weatherData} 
                    navigation={navigation} 
                    setModal={toggleLocationModal}
                    selectedRegion={selectedRegion}
                />
                {showLocationModal && (
                    <Location 
                        onClose={toggleLocationModal} 
                        onFinish={saveRegionToStorage}
                        selectedMainRegion={selectedMainRegion}
                        setSelectedMainRegion={setSelectedMainRegion}
                        selectedSubRegion={selectedSubRegion}
                        setSelectedSubRegion={setSelectedSubRegion}
                    />
                )}
                <FourDays data={weatherData} />
                <WeekForecast forecastData={weatherData} />
            </ScrollContainer>
        </Container>
    );
}

export default WeatherMain;