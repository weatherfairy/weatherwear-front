import React, {useState, useContext} from 'react';
import styled from 'styled-components/native';
import { View, Image, Dimensions, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AuthContext} from '../contexts/Auth';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Container = styled.View`
    width: ${screenWidth}px;
    height: ${screenHeight}px;
    background-color: #fff;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const AppTitleContainer = styled.View`
    height: ${screenHeight*0.5}px;
    width: ${screenWidth}px;
    justify-content: center;
    padding-top: ${screenHeight*0.25}px;
    align-items: center;
`;
const BottomContainer = styled.View`
    height: ${screenHeight*0.5}px;
    width: ${screenWidth}px;
    justify-content: center;
    align-items: center;
`;
const EmailInput = styled.TextInput`
    background-color: #dadada;
    margin-top: ${screenHeight * 0.02}px;
    width: ${screenWidth * 0.7}px;
    height: ${screenHeight * 0.06}px;
    border-radius: 5px;
    border-color: #111;
    font-size: ${screenWidth*0.06}px;
    margin-bottom: ${screenHeight*0.02}px;
`;
const TitleLogo = styled.Image`
    width: ${screenWidth*0.6}px;
    height: ${screenWidth*0.6*(56/139)}px;
`;
const SignupBtn = styled.TouchableOpacity`
    height: ${screenHeight/20}px;
    width: ${screenWidth*0.36}px;
    justify-content: center;
    align-items: center;
    margin-bottom: ${screenHeight/25}px;
`;
const LoginBtn = styled.TouchableOpacity`
    height: ${screenHeight/20}px;
    width: ${screenWidth*0.7}px;
    background-color: #fff6b2;
    border-color: #000;
    border-width: 0.5px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin-top: ${screenHeight/25}px;
    margin-bottom: ${screenHeight/25}px;
`;
const SignupText = styled.Text`
    color: #000;
    font-family: GmarketSansTTFMedium;
    font-size: ${screenWidth/20}px;
    text-decoration-line: underline;
`;
const LoginText = styled.Text`
    color: #000;
    font-family: GmarketSansTTFMedium;
    font-size: ${screenWidth/20}px;
`;

const validateEmail = email => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}
const validatePassword = password => {
    return password.length >= 5 && password.length <= 12 && !/\s/.test(password);
};

const Signin = ({navigation}) => {
    const {setUserToken} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleEmailChange = (text) => {
        const cleanedText = text.replace(/\s/g, '');
        setEmail(cleanedText);
        setIsEmailValid(validateEmail(cleanedText));
    };
    const handlePasswordChange = (text) => {
        const cleanedText = text.replace(/\s/g, '');
        setPassword(cleanedText);
        setIsPasswordValid(validatePassword(cleanedText));
    };
    const handleSignin = async () => {
        const url = `http://15.165.61.76:8080/member/login`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const result = await response.json();
            if(result.token) {
                console.log("로그인 성공! 토큰: ", result.token);
                setUserToken(result.token);
            } else {
                console.log("로그인 실패:", result);
                Alert.alert("로그인 실패", "이메일 또는 비밀번호를 확인해주세요.");
            }
        } catch (error) {
            console.log("로그인 에러: " + error.toString());
            Alert.alert("로그인 에러", "로그인 중 문제가 발생했습니다.");
        }
    };

    return (
        <KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>
        <Container>
            <AppTitleContainer>
                <TitleLogo source={require('../../assets/icons/appLogoDay.png')} />
            </AppTitleContainer>
            <BottomContainer>
                <EmailInput
                    maxLength={40}
                    textAlignVertical='center'
                    placeholder = "이메일" 
                    onChangeText={handleEmailChange}
                    value={email}
                />
                <EmailInput
                    maxLength={40}
                    textAlignVertical='center'
                    placeholder = "비밀번호" 
                    onChangeText={handlePasswordChange}
                    value={password}
                    secureTextEntry={true}
                />
                <LoginBtn 
                    disabled={!isEmailValid || !isPasswordValid}
                    onPress={handleSignin}
                >
                    <LoginText>로그인</LoginText>
                </LoginBtn>
                <SignupBtn onPress={() => navigation.navigate('Signup')}>
                    <SignupText>회원가입</SignupText>
                </SignupBtn>
            </BottomContainer>
        </Container>
        </KeyboardAwareScrollView>
    )
};

export default Signin;