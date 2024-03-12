import {Platform, StatusBar, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../themes/theme';
import {useFonts} from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenHeight / 35;

const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    //background-color: ${({theme}) => theme.dayBackground};
    padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight*1.2 : 0}px;
    //padding-top: ${StatusBar.currentHeight}px;
    padding-left: ${screenWidth*0.05}px;
    padding-right: ${screenWidth*0.05}px;
    height: ${fontSize*1.7 + StatusBar.currentHeight};
`;
const UserCircle = styled(FontAwesome).attrs(({theme}) => ({
    name: 'user-circle-o',
    size: fontSize*1.3,
    color: theme.text
}))``;
const Title = styled.Text`
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFBold;
    color: ${({theme}) => theme.text};
`;

const TitleBar = () => {
    const [fontsLoaded] = useFonts({
        "GmarketSansTTFBold": require("../../assets/fonts/GmarketSansTTFBold.ttf")
    });

    if(!fontsLoaded) {
        return null;
    };

    return (
        <TitleContainer>
            <Title>Weather Wear</Title>
            {/*<UserCircle source={require('../../assets/icons/day_user.png')} />*/}
            <UserCircle />
        </TitleContainer>
    );
}

export default TitleBar;