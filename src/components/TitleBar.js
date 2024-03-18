import {Platform, StatusBar, Dimensions, TouchableOpacity} from 'react-native';
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
    background-color: ${({backgroundColor}) => backgroundColor};
    padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight*1.2 : 0}px;
    //padding-top: ${StatusBar.currentHeight}px;
    padding-left: ${screenWidth*0.05}px;
    padding-right: ${screenWidth*0.05}px;
    height: ${fontSize*1.7 + StatusBar.currentHeight}px;
    width: ${screenWidth}px;
`;
const UserCircle = styled(FontAwesome).attrs(() => ({
    name: 'user-circle-o',
    size: fontSize*1.3,
}))``;
const Title = styled.Text`
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFBold;
    color: ${({textColor}) => textColor};
`;

const TitleBar = ({navigation, backgroundColor, textColor}) => {
    const [fontsLoaded] = useFonts({
        "GmarketSansTTFBold": require("../../assets/fonts/GmarketSansTTFBold.ttf")
    });

    if(!fontsLoaded) {
        return null;
    };

    return (
        <TitleContainer backgroundColor={backgroundColor}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('WeatherMain')}
                style={{marginLeft: -20}}
            >
                <Title textColor={textColor}>Weather Wear</Title>
            </TouchableOpacity>
            <UserCircle color={textColor} style={{marginRight: 10}}/>
        </TitleContainer>
    );
}

export default TitleBar;