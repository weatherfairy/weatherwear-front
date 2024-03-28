import React, { useEffect, useState } from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useFonts} from 'expo-font';
import RecommendPost from '../components/RecommendPost';

const screenHeight = Dimensions.get('window').height;

const ScreenContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.wearBackground};
`;
const ScrollContainer = styled.ScrollView`
    flex: 1;
    flex-direction: column;
`;

const WearRecommend = () => {
    /* dummy data test
    const [recommendations, setRecommendations] = useState([
        {
            "postNo": 1,
            "postDate": "2024-02-10",
            "minTemp": 10,
            "maxTemp": 20,
            "clothesText": "T-shirt and jeans",
            "comment": "Feeling great!",
            "emoji": 1,
            "sky": 1
        },
        {
            "postNo": 2,
            "postDate": "2024-03-11",
            "minTemp": 5,
            "maxTemp": 15,
            "clothesText": "Sweater and pants",
            "comment": "A bit chilly but cozy.",
            "emoji": 2,
            "sky": 1
        },
        {
            "postNo": 3,
            "postDate": "2024-03-17",
            "minTemp": 5,
            "maxTemp": 15,
            "clothesText": "Sweater and pants",
            "comment": "A bit chilly but cozy.",
            "emoji": 2,
            "sky": 1
        }
    ]);
    */
    
    //server연결
    const [recommendations, setRecommendations] = useState([]);

    useEffect(()=>{
        //데이터 불러오기
        const fetchRecommendations = async ()=>{
            try{
                const response = await fetch('http://223.194.157.73:8080/api/v1/closet/recommend');
                const data = await response.json();
                setRecommendations(data);
                //console.log(data);
            }catch(error){
                console.error('추천 데이터 fetch실패', error);
            }
        };
        fetchRecommendations();
    },[]);

    return (
        <ScreenContainer>
            <ScrollContainer contentContainerStyle={{ paddingBottom: screenHeight*0.1,}}>
            {recommendations.map((item) => (
                    <RecommendPost
                        key={item.postNo}
                        postNo={item.postNo}
                        postDate={item.postDate}
                        minTemp={item.minTemp}
                        maxTemp={item.maxTemp}
                        sky={item.sky}
                        clothes={item.clothesText.split(' and ')} // and로 split
                        comment={item.review}
                        emoji={item.emoji}
                        image1 = {item.image1}
                        image2 = {item.image2}
                        image3 = {item.image3}
                    />
                ))}
            </ScrollContainer>
        </ScreenContainer>

    );
}

export default WearRecommend;