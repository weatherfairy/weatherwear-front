import React, {useState} from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert } from 'react-native';
import { StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const fontSize = screenHeight / 40;

const Container = styled.View`
    background-color: #fff;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
const PageTitleContainer = styled.View`
    width: ${screenWidth*0.5}px;
    height: ${screenHeight*0.225}px;
    align-items: center;
    justify-content: center;
`;
const PageTitle = styled.Text`
    font-size: ${fontSize*1.5}px;
    font-family: GmarketSansTTFBold;
`;
const ContainerIndex = styled.Text`
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFMedium;
`;
const IndexContainer = styled.View`
    width: ${screenWidth/4}px;
`;
const GenderText = styled.Text`
    font-size: ${fontSize}px;
    font-family: GmarketSansTTFMedium;
    color: ${({active}) => (active? '#fff6b2' : '#103045')};
`;
const GenderBtn = styled.TouchableOpacity`
    width: ${screenWidth/4}px;
    height: ${fontSize*1.5}px;
    border-radius: 5px;
    background-color: ${({active}) => (active? '#103045' : '#fff6b2')};
    align-items: center;
    justify-content: center;
    margin-right: ${screenWidth/8}px;
`;
const EmailText = styled.Text`
    font-size: ${fontSize*0.7}px;
    font-family: GmarketSansTTFMedium;
`;
const AuthentificationBtn = styled.TouchableOpacity`
    //background-color: #fff6b2;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#fff6b2')};
    width: ${screenWidth/5}px;
    height: ${fontSize*1.5}px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-right: ${screenWidth*0.05}px;
`;
const EmailInput = styled.TextInput`
    background-color: #dadada;
    width: ${screenWidth * 0.45}px;
    height: ${fontSize*1.7}px;
    border-radius: 5px;
    border-color: #111;
    margin-right: ${screenWidth * 0.05}px;
    font-size: ${fontSize*0.8}px;
`;
const EmailConfirmBtn = styled.TouchableOpacity`
    //background-color: #fff6b2;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#fff6b2')};
    width: ${screenWidth/5}px;
    height: ${fontSize*1.5}px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-right: ${screenWidth*0.05}px;
`;
const PasswordInput = styled.TextInput`
    background-color: #dadada;
    width: ${screenWidth * 0.45}px;
    height: ${fontSize*1.7}px;
    border-radius: 5px;
    border-color: #111;
    margin-right: ${screenWidth * 0.05}px;
`;
const PasswordConfirmBtn = styled.TouchableOpacity`
    //background-color: #fff6b2;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#fff6b2')};
    width: ${screenWidth/5}px;
    height: ${fontSize*1.5}px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-right: ${screenWidth*0.05}px;
`;
const BottomArea = styled.View`
    width: ${screenWidth/2}px;
    align-items: center;
`;
const BottomBtn = styled.TouchableOpacity`
    width: ${screenWidth/3}px;
    height: ${fontSize*2}px;
    //background-color: #fed943;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#fed943')};
    align-items: center;
    justify-content: center;
    border-radius: ${fontSize}px;
    elevation: 10;
    shadow-color: #000;
    shadow-opacity: 0.3;
    shadow-radius: 3px;
`;
const BtnIndex = styled.Text`
    font-size: ${fontSize*1.2}px;
    font-family: GmarketSansTTFMedium;
`;
const GenderContainer = styled.View`
    height: ${screenHeight*0.125}px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const GenderBottomContainer = styled.View`
    //height: ${screenHeight*0.075}px;
    flex-direction: row;
    align-items: center;
`;
const BottomBtnContainer = styled.View`
    height: ${screenHeight*0.125}px;
    flex-direction: row;
    align-items: center;
`;
const EmailPasswordContainer = styled.View`
    height: ${screenHeight*0.212}px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const OneDetailContainer = styled.View`
    height: ${screenHeight*0.08}px;
    justify-content: center;
    margin-bottom: ${screenHeight*0.01}px;
`;
const ExceptErrMsgContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;
const ErrMsgContainer = styled.View`
    height: ${screenHeight*0.03}px;
`;
const AlertMsg = styled.Text`
    font-size: ${fontSize*0.65}px;
    font-family: GmarketSansTTFMedium;
    padding-left: ${screenWidth/4}px;
    padding-top: ${fontSize*0.25}px;
    color: #3165f6;
`;
const validateEmail = email => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}

const Signup = ({navigation}) => {
    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [code, setCode] = useState('');
    const [isCodeVerified, setIsCodeVeriied] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [emailAuthMessage, setEmailAuthMessage] = useState('');
    const [verifyMessage, setVerifyMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

    const handelEmailChange = (text) => {
        setEmail(text);
        if (validateEmail(text)) {
            setEmailAuthMessage("");
        } else {
            setEmailAuthMessage("유효하지 않은 이메일 형식입니다.");
        }
    };
    const handleEmailAuthentification = async () => {

        const url = `http://15.165.61.76:8080/member/signup/email?email=${encodeURIComponent(email)}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const result = await response.json();
                if (result === true) {
                    setEmailAuthMessage("이메일 인증이 요청되었습니다");
                    setIsEmailVerified(true);
                } else {
                    setEmailAuthMessage("인증 요청 실패");
                    setIsEmailVerified(false);
                }
            } else {
                setEmailAuthMessage("서버 오류");
                setIsEmailVerified(false);
            }
        } catch (error) {
            setEmailAuthMessage("실패: " + error.toString());
            setIsEmailVerified(false);
        }
    };

    const handleVerify = async () => {
        try {
            const response = await fetch('http://15.165.61.76:8080/member/signup/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    code: code,
                }),
            });
            if (response.status === 200) {
                const result = await response.json();
                if (result === true) {
                    setVerifyMessage("이메일 인증에 성공했습니다.");
                    setIsCodeVeriied(true);
                } else {
                    console.log('email: ' + email);
                    console.log('code: ' + code);
                    console.log(result);
                    setVerifyMessage("인증코드가 일치하지 않습니다.");
                    setIsCodeVeriied(false);
                }
            } else {
                console.log('error: ' + response.status); 
                console.log('email: ' + email);
                console.log('code: ' + code);
                setVerifyMessage("서버 오류");
                setIsCodeVeriied(false);
            }
        } catch (error) {
            setVerifyMessage("인증 실패: ", error.toString());
            setIsCodeVeriied(false);
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (text.length < 5 || text.length > 12) {
            setPasswordMessage("비밀번호는 5~12글자로 설정해야 합니다.");
        } else {
            setPasswordMessage(""); // Clear the message when the password is valid
        }
    };
    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        if (text !== password) {
            setPasswordMessage("비밀번호가 일치하지 않습니다.");
        } else {
            setPasswordMessage(""); // Clear the message when the password is valid
        }
    };
    const handlePasswordConfirmation = () => {
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();
        if (trimmedPassword !== trimmedConfirmPassword) {
            setPasswordMessage("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (trimmedPassword.length < 5 || trimmedPassword.length > 12) {
            setPasswordMessage("비밀번호는 5~12글자로 설정해야 합니다.");
            return;
        }
        if (/\s/.test(trimmedPassword)) {
            setPasswordMessage("비밀번호에 공백을 포함할 수 없습니다.");
            return;
        }
        setPassword(trimmedPassword);
        setConfirmPassword(trimmedConfirmPassword);
        setPasswordMessage("비밀번호 설정이 완료되었습니다.");
        setIsPasswordValid(true);
    };
    const canSignUp = gender !== null && isEmailVerified && isCodeVerified && isPasswordValid;
    const handleSignUp = async () => {
        try{
            const response = await fetch('http://15.165.61.76:8080/member/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    gender: gender
                }),
            });
            const result = await response.json();
            if(result === true) {
                console.log("회원가입 성공:", result);
                Alert.alert(
                    "회원가입 성공",
                    "WeatherWear에 가입하신 것을 축하드립니다!\n로그인 페이지로 돌아갑니다.",
                    [
                        { text: "확인", onPress: () => navigation.navigate('Signin') }
                    ]
                )
            } else {
                console.log("회원가입 실패:", result);
                Alert.alert("회원가입 실패", "회원가입 과정에서 문제가 발생했습니다.");
            }
        } catch (error) {
            console.log("회원가입 중 에러 발생:", error);
            Alert.alert("회원가입 오류", "네트워크 오류가 발생했습니다.");
        }
    };

    return (
        <KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>
            <Container style={{ paddingTop: statusBarHeight }}>
                <PageTitleContainer>
                    <PageTitle>회원가입</PageTitle>
                </PageTitleContainer>
                <GenderContainer>
                    <GenderBottomContainer>
                        <IndexContainer><ContainerIndex>성별</ContainerIndex></IndexContainer>
                        <GenderBtn
                            active={gender === 0}
                            onPress={() => setGender(0)}
                        >
                            <GenderText active={gender === 0}>여성</GenderText>
                        </GenderBtn>
                        <GenderBtn
                            active={gender === 1}
                            onPress={() => setGender(1)}
                        >
                            <GenderText active={gender === 1}>남성</GenderText>
                        </GenderBtn>
                    </GenderBottomContainer>
                    <ErrMsgContainer>
                        <AlertMsg></AlertMsg>
                    </ErrMsgContainer>
                </GenderContainer>
                <EmailPasswordContainer>
                    <OneDetailContainer>
                        <ExceptErrMsgContainer>
                            <IndexContainer><ContainerIndex>이메일</ContainerIndex></IndexContainer>
                            <EmailInput
                                value={email}
                                onChangeText={handelEmailChange}
                                placeholder="이메일 입력"
                            />
                            <AuthentificationBtn 
                                onPress={handleEmailAuthentification}
                                disabled={!validateEmail(email)}
                            >
                                <EmailText>인증</EmailText>
                            </AuthentificationBtn>
                        </ExceptErrMsgContainer>
                        <ErrMsgContainer>
                            <AlertMsg>{emailAuthMessage}</AlertMsg>
                        </ErrMsgContainer>
                    </OneDetailContainer>
                    <OneDetailContainer>
                        <ExceptErrMsgContainer>
                            <IndexContainer><ContainerIndex>   </ContainerIndex></IndexContainer>
                            <EmailInput
                                value={code}
                                onChangeText={setCode}
                                placeholder="인증번호 입력"
                            />
                            <EmailConfirmBtn 
                                onPress={handleVerify}
                                disabled={!isEmailVerified}
                            >
                                <EmailText>확인</EmailText>
                            </EmailConfirmBtn>
                        </ExceptErrMsgContainer>
                        <ErrMsgContainer>
                            <AlertMsg>{verifyMessage}</AlertMsg>
                        </ErrMsgContainer>
                    </OneDetailContainer>
                </EmailPasswordContainer>
                <EmailPasswordContainer>
                    <OneDetailContainer>
                        <ExceptErrMsgContainer>
                            <IndexContainer><ContainerIndex>비밀번호</ContainerIndex></IndexContainer>
                            <PasswordInput
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={true}
                                placeholder="비밀번호 입력"
                            />
                            <IndexContainer></IndexContainer>
                        </ExceptErrMsgContainer>
                        <ErrMsgContainer>
                            <AlertMsg>{passwordMessage}</AlertMsg>
                        </ErrMsgContainer>
                    </OneDetailContainer>
                    <OneDetailContainer>
                        <ExceptErrMsgContainer>
                            <IndexContainer></IndexContainer>
                            <PasswordInput
                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                                secureTextEntry={true}
                                placeholder="비밀번호 재입력"
                            />
                            <PasswordConfirmBtn 
                                onPress={handlePasswordConfirmation}
                                disabled={!isCodeVerified}
                            >
                                <EmailText>확인</EmailText>
                            </PasswordConfirmBtn>
                        </ExceptErrMsgContainer>
                        <ErrMsgContainer>
                            <AlertMsg>{passwordMessage}</AlertMsg>
                        </ErrMsgContainer>
                    </OneDetailContainer>
                </EmailPasswordContainer>
                <BottomBtnContainer>
                    <BottomArea>
                        <BottomBtn onPress={() => navigation.navigate('Signin')}><BtnIndex>뒤로</BtnIndex></BottomBtn>
                    </BottomArea>
                    <BottomArea>
                        <BottomBtn disabled={!canSignUp} onPress={handleSignUp}>
                            <BtnIndex>회원가입</BtnIndex>
                        </BottomBtn>
                    </BottomArea>
                </BottomBtnContainer>
            </Container>
        </KeyboardAwareScrollView>
    )
};

export default Signup;