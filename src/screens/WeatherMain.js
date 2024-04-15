import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as SplashScreen from 'expo-splash-screen';
import { BriefInfos, ShortForecast, WeekForecast, TodayWeatherInfo, ThreeDays, ThreeDaysScroll, Location }from '../components';

const yesterday_data = {
    temp : 1,
    rain: '50%',
    sky: 1,
    dust: '나쁨',
    top: 1,
    bottom: 1,
    temp_array: [
        0, -1, -1, -3, -1, -2, -3, -1, 0, 0, 1, 1, 
        2, 2, 3, 3, 2, 1, 2, 1, 0, -1, -2, -3
    ],
    sky_array: [
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
    ],
    min_temp : [
        0, -3, 0, 0, -2, -5, -4, 1, 3, 1, 0
    ],
    max_temp : [
        6, 3, 4, 4, 3, 1, 1, 7, 9, 4, 5 
    ]
};

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
    "temp": 12.7,
    "rain": 70,
    "sky": 2,
    "dust": 1,
    "top": 4,
    "bottom": 2,
    
    // 슬라이더에 보여지는 데이터
    "temp_array_today": [18, 17, 19, 20, 21, 22, 23, 24],
    "sky_array_today": [1, 1, 1, 2, 2, 2, 3, 3],
    
    "temp_array_yesterday": [18, 17, 19, 20, 21, 22, 23, 24],
    "sky_array_yesterday": [1, 1, 1, 2, 2, 2, 3, 3],
    
    "temp_array_tomorrow": [18, 17, 19, 20, 21, 22, 23, 24],
    "sky_array_tomorrow": [1, 1, 1, 2, 2, 2, 3, 3],

    "temp_array_aftertomorrow": [18, 17, 19, 20, 21, 22, 23, 24],
    "sky_array_aftertomorrow": [1, 1, 1, 2, 2, 2, 3, 3],
    
    //주간 날씨에 보여지는 데이터
    "min_temp": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    "max_temp": [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20],
    "weekly_rain": [10, 20, 30, 40, 50, 60, 70, 80, 90, 80, 70]
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

const WeatherMain = ({navigation}) => {
    //const [weatherData, setWeatherData] = useState(errorData);

    //테스트용 더미 날씨데이터
    const weatherData = dummyData;

    const [showLocationModal, setShowLocationModal] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('서울특별시 성북구');

    const toggleLocationModal = () => {
        setShowLocationModal(!showLocationModal);
    }
    
    /*
    useEffect(() => {
        const fetchWeatherData = async() => {
            try {
                const response = await fetch(`http://223.194.153.26:8080/api/v1/weathers/${selectedDate}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const jsonResponse = await response.json();
                console.log('Response.content');
                if (jsonResponse && jsonResponse.content) {
                    setWeatherData(jsonResponse.content);
                    console.log('WeatherData set: ', jsonResponse.content);
                } else {
                    setWeatherData(errorData);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setWeatherData(errorData);
            }
        };

        fetchWeatherData();
}, [selectedDate]);
*/
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
                <TodayWeatherInfo 
                    data={weatherData} 
                    navigation={navigation} 
                    setModal={toggleLocationModal}
                    selectedRegion={selectedRegion}
                />
                {showLocationModal && <Location onClose={toggleLocationModal} onFinish={setSelectedRegion}/>}
                <ThreeDays data={weatherData} />
                <WeekForecast />
            </ScrollContainer>
        </Container>
    );
}

export default WeatherMain;