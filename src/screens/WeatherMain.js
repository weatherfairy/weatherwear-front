import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as SplashScreen from 'expo-splash-screen';
import { BriefInfos, ShortForecast, WeekForecast }from '../components';

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

const today_data = {
    temp : -1,
    rain: '60%',
    sky: 1,
    dust: '나쁨',
    top: 2,
    bottom: 2,
    temp_array: [
        -1, 0, -1, -3, -2, -2, -4, -1, 0, 0, 1, 1, 
        2, 2, 1, 0, 1, -1, -2, -2, -3, -4, -4, -4
    ],
    sky_array: [
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
    ],
    min_temp : [
        -3, -4, 0, -2, -5, -4, 1, 3, 1, 0, 1
    ],
    max_temp : [
        3, 2, 4, 3, 1, 1, 7, 9, 4, 5, 6 
    ]
};

const tomorrow_data = {
    temp : 2,
    rain: '30%',
    sky: 1,
    dust: '보통',
    top: 3,
    bottom: 3,
    temp_array: [
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 
        2, 3, 4, 3, 3, 2, 2, 2, 1, 0, 0, 0
    ],
    sky_array: [
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
    ],
    min_temp : [
        -4, 0, -2, -5, -4, 1, 3, 1, 0, 1, 0
    ],
    max_temp : [
        2, 4, 3, 1, 1, 7, 9, 4, 5, 6, 5 
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
    const [selectedDate, setSelectedDate] = useState('today');
    //const [weatherData, setWeatherData] = useState(errorData);

    //테스트용 더미 날씨데이터
    const weatherData = selectedDate === 'yesterday' ? yesterday_data :
                        selectedDate === 'tomorrow' ? tomorrow_data : today_data;
    
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
            <Container>
                <ScrollContainer>
                    <BriefInfos data={weatherData} navigation={navigation} changeDate={setSelectedDate}/>
                    <ShortForecast data={weatherData} />
                    <WeekForecast />
                </ScrollContainer>
            </Container>
    );
}

export default WeatherMain;