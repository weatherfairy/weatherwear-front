import React from 'react';
import { Modal, View, Text, StyleSheet,Pressable, ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const handleDelete = async (postNo,onClose,onDeleteSuccess) => {
    try {
        console.log("게시물 삭제 시도:", postNo);
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await fetch('http://15.165.61.76:8080/api/v1/closet/'+postNo, {  
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify({ postNo })
        });
        if (response.ok) {
            console.log('삭제 응답:', response.status);
            if (onDeleteSuccess) {
                onDeleteSuccess(postNo);
            };
            onClose();
        } else {
            console.log('게시물 삭제 실패:', response.status);
        }
    } catch (error) {
        console.error('삭제 오류:', error);
    }
};


const DetailModal = ({ visible, modalContent, onClose, onDeleteSuccess, navigation }) => (
    <Modal
    animationType="slide"
    transparent={true}//모달 투명도
    visible={visible}
    onRequestClose={onClose}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                        <View style ={styles.buttonClose}>  
                            <Pressable
                                style={styles.buttonClose}
                                onPress={onClose}>
                                <Text style={styles.buttonClose}>X</Text>
                            </Pressable>
                        </View>
                        <ModalContainer>
                        <View style = {{height: ScreenHeight* 0.4}}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <Image source={{ uri: modalContent?.image1 }} style={styles.image} />
                            <Image source={{ uri: modalContent?.image2 }} style={styles.image} />
                            <Image source={{ uri: modalContent?.image3 }} style={styles.image} />
                        </ScrollView>
                        </View>
                            <InfoContainer>
                                <View style = {[styles.parallel, styles.strech]}>
                                    <Text style = {styles.boldText}> {modalContent?.date}</Text>
                                    <Text style = {styles.mediumText}>{modalContent?.minTemp}°C~{modalContent?.maxTemp}°C</Text>
                                </View>
                                <View style = {styles.parallel}>
                                    <Text style = {styles.mediumText}> {modalContent?.clothesText}</Text>
                                    <EmojiComponent emoji = {modalContent?.emoji}/>
                                </View>
                                <View style = {styles.margin}>
                                    <Text style = {styles.lightText}> {modalContent?.review}</Text>
                                </View>
                            </InfoContainer>
                        </ModalContainer>
                        <ButtonContainer>
                                <IconButton onPress={() => {
                                    console.log('Edit pressed');
                                    onClose();
                                    navigation.navigate('WearWriting', {
                                        date: modalContent.date,
                                        minTemp: modalContent.minTemp,
                                        maxTemp: modalContent.maxTemp,
                                        clothesText: modalContent.clothesText,
                                        review: modalContent.review,
                                        emoji: modalContent.emoji,
                                        postNo: modalContent.postNo,
                                        images: [modalContent.image1, modalContent.image2, modalContent.image3]
                                    });
                                }}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onPress={() => handleDelete(modalContent?.postNo, onClose, onDeleteSuccess)}>
                                    <DeleteIcon/>
                                </IconButton>
                        </ButtonContainer>
            </View>
        </View>
    </Modal>
);



const ModalContainer = styled.View`
    width: ${ScreenWidth* 0.75}px; 
`;
const InfoContainer = styled.View`
    //background-color: pink;
    margin-top: ${ScreenHeight/93}px;
    margin-left:${ScreenHeight/310}px;
    width: 90%;
    height: 25%;
`;
//이모지
function getEmojiSource(emoji) {
    switch (emoji) {
        case 0:
            return require('../../assets/icons/best.png');
        case 1:
            return require('../../assets/icons/good.png');
        case 2:
            return require('../../assets/icons/bad.png');
        default: null;
    }
}

const EmojiComponent = ({ emoji }) => {
    return (
        <Image
            style={styles.emoji}
            source={getEmojiSource(emoji)}
        />
    );
}

const ButtonContainer = styled.View`
    //background-color: skyblue;
    position: absolute;
    bottom: ${ScreenHeight/186}px;
    right: ${ScreenHeight/186}px;
    flex-direction: row;
`;
const IconButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    height: ${ScreenHeight*0.06}px;
    width: ${ScreenHeight*0.06}px;
`;
const EditIcon = styled(MaterialIcons).attrs(({theme}) => ({
    name: 'edit',
    size: ScreenHeight*0.04,
    color: theme.wearText
}))``;
const DeleteIcon = styled(FontAwesome6).attrs(({theme}) => ({
    name: 'trash-alt',
    size: ScreenHeight*0.04,
    color: theme.wearText
}))``;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        marginTop: 0
    },

    modalView: {
        margin: ScreenHeight/46,
        backgroundColor: 'white',
        borderRadius: ScreenHeight/62,
        padding: ScreenHeight/26,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: ScreenHeight/62,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: ScreenWidth*0.85,
        height: ScreenHeight*0.7
    },

    buttonClose: {
        alignSelf: 'flex-end',
        marginRight: -ScreenHeight/133,
        marginTop: -ScreenHeight/93,
        marginBottom: ScreenHeight/186,
        fontSize: ScreenHeight*0.03,
        fontWeight: '600',
    },
    boldText:{
        fontSize: ScreenHeight*0.025,
        fontWeight: '700',
    },
    mediumText:{
        fontSize: ScreenHeight*0.025,
        fontWeight: '400',
    },
    lightText:{
        fontSize: ScreenHeight*0.018,
        fontWeight: '300',
        marginLeft: '1%',
    },

    imagesContainer: {
        flexDirection: 'row',
    },
    image: {
        width: Dimensions.get('window').width * 0.75, // 화면 너비의 75%를 차지하도록 설정
        height: Dimensions.get('window').height * 0.4, // 이미지 높이 설정. 필요에 따라 조정하세요.
        resizeMode: 'cover', // 이미지가 컨테이너에 맞게 조정됩니다.
        marginRight: ScreenHeight/186,
    },

    margin:{
        marginTop : ScreenHeight/93,
    },
    parallel:{
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: ScreenHeight/186,
    },
    strech:{
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: ScreenHeight/186,
        width: ScreenWidth * 0.75,
        justifyContent: 'space-between',
    },

    emoji: {
        width: ScreenWidth/17,
        height: ScreenHeight/37,
        marginLeft: ScreenHeight/155,
    },
});



export default DetailModal;