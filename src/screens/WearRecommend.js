import React, { useEffect, useState } from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
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
    // dummy data test
    // const [recommendations, setRecommendations] = useState([
    //     {
    //         "postNo": 1,
    //         "postDate": "2024-02-10",
    //         "minTemp": 10,
    //         "maxTemp": 20,
    //         "clothesText": "T-shirt and jeans",
    //         "review": "Feeling great! I am very very happt today ~~ because ",
    //         "emoji": 1,
    //         "sky": 1,
    //         "image1": "https://picsum.photos/200/300",
    //         "image2": "https://picsum.photos/200/300",
    //         "image3": "https://picsum.photos/200/300",
    //     },
    //     {
    //         "postNo": 2,
    //         "postDate": "2024-03-11",
    //         "minTemp": 5,
    //         "maxTemp": 15,
    //         "clothesText": "Sweater and pants",
    //         "review": "A bit chilly but cozy.",
    //         "emoji": 2,
    //         "sky": 1,
    //         "image1": "https://picsum.photos/200/300",
    //         "image2": "https://picsum.photos/200/300",
    //         "image3": "https://picsum.photos/200/300",
    //     },
    //     {
    //         "postNo": 3,
    //         "postDate": "2024-03-17",
    //         "minTemp": 5,
    //         "maxTemp": 15,
    //         "clothesText": "Sweater and pants",
    //         "review": "A bit chilly but cozy.",
    //         "emoji": 2,
    //         "sky": 1,
    //         "image1": "https://picsum.photos/200/300",
    //         "image2": "https://picsum.photos/200/300",
    //         "image3": "https://picsum.photos/200/300",
    //     }
    // ]);

    
    //server연결
    const [recommendations, setRecommendations] = useState([]);

    useEffect(()=>{
        //데이터 불러오기
        const fetchRecommendations = async ()=>{
            try{
                const response = await fetch('http://15.165.61.76:8080/api/v1/closet/recommend?location=서울특별시성북구');
                const data = await response.json();
                setRecommendations(data);
                console.log(data);
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