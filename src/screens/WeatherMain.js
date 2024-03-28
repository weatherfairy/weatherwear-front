import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as SplashScreen from 'expo-splash-screen';
import { BriefInfos, ShortForecast, WeekForecast }from '../components';

const dummy_data = [
    {
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
    },
    {
        temp : -1,
        rain: '60%',
        sky: 2,
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
    },
    {
        temp : 2,
        rain: '30%',
        sky: 3,
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
    }
]

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
}

const today_data = {
    temp : -1,
    rain: '60%',
    sky: 2,
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
}

const tomorrow_data = {
    temp : 2,
    rain: '30%',
    sky: 3,
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

    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        const fetchWeatherData = async() => {
            try {
                const response = await fetch('http://223.194.153.26:8080/api/v1/weathers/today', {
                    method: 'GET'
                    /*headers: {
                        'Content-Type': 'application/json',
                    }*/
                });

                const jsonResponse = await response.json();
                console.log('Response.content');
                if (jsonResponse && jsonResponse.content) {
                setWeatherData(jsonResponse.content);
                console.log('WeatherData set: ', jsonResponse.content);
                }
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        fetchWeatherData();
}, []);

    return (
            <Container>
                <ScrollContainer>
                    <BriefInfos data={today_data} navigation={navigation} />
                    <ShortForecast data={today_data} />
                    <WeekForecast />
                </ScrollContainer>
            </Container>
    );
}

export default WeatherMain;