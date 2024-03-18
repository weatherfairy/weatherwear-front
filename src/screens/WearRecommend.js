import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useFonts} from 'expo-font';
import RecommendPost from '../components/RecommendPost';

const ScreenContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.wearBackground};
`;
const ScrollContainer = styled.ScrollView`
    flex: 1;
    flex-direction: column;
`;

const WearRecommend = () => {
    return (
        <ScreenContainer>
            <ScrollContainer contentContainerStyle={{ paddingBottom: 160 }}>
                <RecommendPost 
                    postNo = {1} 
                    postDate = "2024.01.27" 
                    minTemp = {-6} 
                    maxTemp={3} 
                    clothes = {['코트','니트','청바지']} 
                    comment = "바람이 많이 불어서 추웠다." 
                    satisfaction = {1}>
                </RecommendPost>

                <RecommendPost postNo = {2} postDate = "2024.01.27" minTemp = {-2} maxTemp={4} clothes = {['코트','니트','청바지']} comment = "바람이 많이 불어서 추웠다." satisfaction = {2}>
                </RecommendPost>


                <RecommendPost postNo = {3} postDate = "2024.01.27" minTemp = {0} maxTemp={5} clothes = {['코트','니트','청바지']} comment = "바람이 많이 불어서 추웠다." satisfaction = {1}>
                </RecommendPost>

            </ScrollContainer>
        </ScreenContainer>

    );
}

export default WearRecommend;