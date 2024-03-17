import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useFonts} from 'expo-font';

const screenHeight = Dimensions.get('window').height;

const ScreenContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;
const ScrollContainer = styled.ScrollView`
    flex: 1;
    flex-direction: column;
`;
const RecommendContainer = styled.View`
    flex-direction: column;
    height: ${screenHeight*0.8}px;
`;
const WearRecommend = () => {
    return <ScreenContainer />
}

export default WearRecommend;