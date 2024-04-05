import styled from 'styled-components/native';
import { View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import KakaoLogins from '@react-native-seoul/kakao-login';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #99ccff;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
`;
const AppTitleContainer = styled.View`
    flex:1;
    //height: ${screenHeight/3}px;
    width: ${screenWidth}px;
    margin-top: ${screenHeight/6}px;
    flex-direction: row;
    //justify-content: center;
    align-items: center;
    position: relative;
`;
const TextContainer = styled.View`
    flex-direction: column;
    position: absolute;
    left: ${screenWidth/7}px;
    zIndex: 1;
`;
const AppTitle = styled.Text`
    color: #000;
    font-family: GmarketSansTTFBold;
    font-size: ${screenWidth/8}px;
`;
const TitleLogo = styled.Image`
    width: ${screenWidth*0.7}px;
    height: ${screenHeight/8}px;
    position: absolute;
    left: ${screenWidth/7}px;
    zIndex: 1;
`;
const AppTitleImage = styled.Image`
    width: ${screenWidth/3}px;
    height: ${screenWidth/3}px;
    position: absolute;
    right: ${screenWidth/7}px;
`;
const LoginBtn = styled.TouchableOpacity`
    height: ${screenHeight/20}px;
    width: ${screenWidth*0.7}px;
    background-color: #FEE500;
    border-radius: 7px;
    border-color: #000;
    border-width: 0.5px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-bottom: ${screenHeight/5}px;
`;
const ChatIcon = styled(Ionicons).attrs(() => ({
    name: 'chatbubble-sharp',
    size: screenWidth/20,
    color: '#000'
}))`
    margin-right: 5px;
`;
const LoginText = styled.Text`
    color: #000;
    font-family: GmarketSansTTFMedium;
    font-size: ${screenWidth/20}px;
`;

// 로그인 버튼을 눌렀을 때 실행될 함수
const kakaoLogin = async () => {
    try {
        const result = await KakaoLogins.login();
        alert(`Welcome, ${result.id}`);
    } catch (err) {
        if (err.code === 'E_CANCELLED_OPERATION') {
            alert('Login cancelled');
        } else {
            alert(`Login Failed: ${err.message}`);
        }
    }
};

const Login = () => {
    return (
        <Container>
            <AppTitleContainer>
                <TitleLogo source={require('../../assets/icons/appLogoDay.png')} />
            </AppTitleContainer>
            <LoginBtn onPress={kakaoLogin}>
                <ChatIcon/>
                <LoginText>카카오톡으로 로그인하기</LoginText>
            </LoginBtn>
        </Container>
    )
};

export default Login;