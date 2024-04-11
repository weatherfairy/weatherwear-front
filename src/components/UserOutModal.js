import styled from 'styled-components/native';
import {Dimensions, Modal, TouchableOpacity} from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const modalHeight = Dimensions.get('window').height*0.15;
const modalWidth = Dimensions.get('window').width*0.3;

const ModalContainer = styled.View`
    width: ${modalWidth}px;
    height: ${modalHeight}px;
    background-color: ${({theme}) => theme.grey};
    border-radius: 5px;
    flex-direction: column;
    elevation: 10;
    shadow-color: ${({theme}) => theme.wearText};
    shadow-opacity: 0.4;
    shadow-radius: 3px;
    position: 'absolute';
    left: ${screenWidth*0.7-10}px;
    top: ${screenHeight/35*1.7}px;
`;
const SelectContainer = styled.TouchableOpacity`
    width: ${modalWidth}px;
    height: ${modalHeight/2}px;
    justify-content: center;
    align-items: center;
`;
const OptionText = styled.Text`
    font-size: ${modalWidth/5}px;
    color: ${({theme}) => theme.wearText};
    font-family: GmarketSansTTFMedium;
`;
const kakaoLogout = async () => {
    try {
        const result = await KakaoLogins.logout();
        console.log(result);
        onClose();
    } catch (error) {
        console.log(error);
    }
};

const UserOutModal = ({ isVisible, onClose }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressOut={onClose}
                style={{flex: 1}} //이값이 없으면 모달 밖의 화면을 터치해도 모달이 사라지지 않음
            >
                <ModalContainer>
                    <SelectContainer onPress={kakaoLogout}>
                        <OptionText>로그아웃</OptionText>
                    </SelectContainer>
                    <SelectContainer>
                        <OptionText>회원탈퇴</OptionText>
                    </SelectContainer>
                </ModalContainer>
            </TouchableOpacity>
        </Modal>
    )
};

export default UserOutModal;