import {Platform, StatusBar, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../themes/theme';
import {useFonts} from 'expo-font';

const screenHeight = Dimensions.get('window').height;
const fontSize = screenHeight / 35;

const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({theme}) => theme.dayBackground};
    padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight*1.2 : 0}px;
    padding-left: ${StatusBar.currentHeight*0.4}px;
    padding-right: ${StatusBar.currentHeight*0.4}px;
`;
const UserCircle = styled.Image`
    width: ${fontSize*1.3}px;
    height: ${fontSize*1.3}px;
`;
const Title = styled.Text`
    font-size: ${fontSize}px;
    fontFamily: GmarketSansTTFBold;
    color: ${({theme}) => theme.dayText};
`;

const TitleBar = () => {
    const [fontsLoaded] = useFonts({
        "GmarketSansTTFBold": require("../../assets/fonts/GmarketSansTTFBold.ttf")
    });

    if(!fontsLoaded) {
        return null;
    };

    return (
        <TitleContainer theme={theme}>
            <Title theme={theme}>Weather Wear</Title>
            <UserCircle source={require('../../assets/icons/user.png')} />
        </TitleContainer>
    );
}

export default TitleBar;