import {Platform, StatusBar, Dimensions, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../themes/theme';
import { FontAwesome } from '@expo/vector-icons';
import UserOutModal from './UserOutModal';
import {useState} from 'react';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenHeight / 35;

const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${({backgroundColor}) => backgroundColor};
    //padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight*1.2 : 0}px;
    //padding-top: ${StatusBar.currentHeight}px;
    padding-left: ${screenWidth*0.03}px;
    padding-right: ${screenWidth*0.03}px;
    height: ${fontSize*1.7}px;
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

const TitleBar = ({navigation, backgroundColor, textColor, page}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    const currentHour = new Date().getHours();
    const isDay = currentHour >= 6 && currentHour < 18;

    const logoImage = page === 'WearMain' 
        ? require('../../assets/icons/titleLogoDay.png') 
        : isDay 
            ? require('../../assets/icons/titleLogoDay.png') 
            : require('../../assets/icons/titleLogoNight.png');

    return (
        /*<TitleContainer backgroundColor={backgroundColor}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('WeatherMain')}
                style={{marginLeft: -20}}
            >
                <Title textColor={textColor}>Weather Wear</Title>
            </TouchableOpacity>
            <UserCircle color={textColor} style={{marginRight: 10}}/>
        </TitleContainer>*/
        <>
            <TitleContainer backgroundColor={backgroundColor}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('WeatherMain')}
                    style={{marginLeft: -20}}
                >
                    <Image 
                    source={logoImage} 
                        //style={{width: screenWidth/2}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal}>
                    <UserCircle color={textColor} style={{marginRight: 10}}/>
                </TouchableOpacity>
            </TitleContainer>
            {isModalVisible && <UserOutModal isVisible={isModalVisible} onClose={toggleModal} />}
        </>
    );
}

export default TitleBar;