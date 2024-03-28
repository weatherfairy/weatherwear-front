import styled from 'styled-components/native';
import {Dimensions, FlatList, Alert, Modal, StyleSheet, Text, Pressable, View, Image,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome6 } from '@expo/vector-icons';

const data = [
    {postNo: '1', date: '1/25', image: require('../../assets/images/example.png')},
    {postNo: '2', date: '1/26'},
    {postNo: '3',  date: '1/27', image: require('../../assets/images/example.png')},
    {postNo: '4',  date: '1/29'},
    {postNo: '5',  date: '1/28', image: require('../../assets/images/example.png')},
    {postNo: '6', date: '1/30'},
    {postNo: '7',  date: '2/2'},
    {postNo: '8',  date: '2/4'},
    {postNo: '9',  date: '2/1'},
    {postNo: '10', date: '2/5'},
    {postNo: '11',  date: '1/25'},
    {postNo: '12',  date: '1/26'},
    {postNo: '13',  date: '1/27'},
    {postNo: '14',  date: '1/29'},
    {postNo: '15',  date: '1/28'},
    {postNo: '16',  date: '1/30'},
    {postNo: '17',  date: '2/2'},
    {postNo: '18',  date: '2/4'},
    {postNo: '19',  date: '2/1'},
    {postNo: '20',  date: '2/5'},
    {postNo: '21',  date: '1/25'}
];
const Container = styled.SafeAreaView`
    background-color: ${({theme}) => theme.wearBackground};
`;
const ImageContainer = styled.TouchableOpacity`
    position: relative;
    width: ${Dimensions.get('window').width/3}px;
    height: ${Dimensions.get('window').height/4.5}px;
    background-color: ${({theme}) => theme.grey};
    border-width: 1px;
    border-color: ${({theme}) => theme.wearBackground};
`;
const Img = styled.Image`
    width: 100%;
    height: 100%;
`;
const DateContainer = styled.View`
    position: absolute;
    bottom: 3px;
    right: 3px;
    justify-content: center;
    align-items: center;
    width: ${Dimensions.get('window').width/12}px;
    height: ${Dimensions.get('window').height/60}px;
    background-color: ${({theme}) => theme.wearText};
    border-radius: ${Dimensions.get('window').height/120}px;
`;
const DateText = styled.Text`
    color: ${({theme}) => theme.wearBackground};
    font-size: ${Dimensions.get('window').height/70}px;
`;
const FloatingButton = styled.TouchableOpacity`
    width: ${Dimensions.get('window').height/14}px;
    height: ${Dimensions.get('window').height/14}px;
    background-color: ${({theme}) => theme.wearBackground};
    border-radius: ${Dimensions.get('window').height/28}px;
    position: absolute;
    bottom: ${Dimensions.get('window').height*0.075}px;
    right: ${Dimensions.get('window').height*0.02}px;
    justify-content: center;
    align-items: center;
    elevation: 12;
    shadow-color: ${({theme}) => theme.wearText};
    shadow-opacity: 0.3;
    shadow-radius: 5px;
`;
const AddWritingIcon = styled(FontAwesome6).attrs(({theme}) => ({
    name: 'add',
    size: Dimensions.get('window').height/20,
    color: theme.wearText
}))``;
const RecordGallery = ({ navigation }) => {
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await fetch('http://223.194.158.167:8080/api/v1/closet/lists', {
                method: 'GET'
                /*headers: {
                    'Content-Type': 'application/json',
                }*/
            });
    
                const jsonResponse = await response.json();
                console.log('Response.content');
                if (jsonResponse && jsonResponse.content) {
                setImageData(jsonResponse.content);
                console.log('ImageData set: ', jsonResponse.content);
                }
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };
    
        fetchImageData();
}, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);//모달에 표시할 내용

    const fetchDataFromServer = async (postNo) => {
        
        try {
            const response = await fetch(`http://223.194.157.73:8080/api/v1/closet/lists/1`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('서버로부터 응답을 받는 데 실패했습니다.');
            }
        } catch (error) {
            Alert.alert("에러", error.message);
            return null;
        }
        /*
        const mockData = {
            images: [
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/200',
                'https://via.placeholder.com/250'
            ],
            satisfactionEmoji: 1, 
            comment: "오늘의 코멘트는요..뭘로 할까요,, 모르겠어요!!! 우리 캡스톤은 5/31일 발표예요ㅎ-ㅎ",
            clothes: "티셔츠, 청바지, 운동화",
            minTemp: -5,
            maxTemp: 5,            
        };
        return mockData;
        */
    };


    // 선택된 postNo로 서버로부터 데이터 가져오기.
    const handleImagePress = async (postNo) => {
        console.log("눌림");
        // postNo를 이용해 date를 찾기
        const itemDate = data.find(item => item.postNo === postNo)?.date;
        const dataFromServer = await fetchDataFromServer(postNo);
        if (dataFromServer) {
            console.log("로드 성공");
            setModalContent({ ...dataFromServer, date: itemDate });
            setModalVisible(true);
        }
        if (!dataFromServer) {
            console.log("로드 실패");
        }
    };

    return (
        <Container>
            <Modal animationType="slide"
                transparent={true}//모달 투명도
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style ={styles.buttonClose}>  
                            <Pressable
                                style={styles.buttonClose}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.buttonClose}>X</Text>
                            </Pressable>
                        </View>
                        <ModalContainer>
                            <View style = {styles.images}>
                                <ImagesContainer horizental= {true} showsHorizontalScrollIndicator={true}   >
                                    <Image source={{uri: modalContent?.image1}} style={{width: '100%', height: '100%'}} />
                                    <Image source={{uri: modalContent?.image2}} style={{width: '100%', height: '100%'}} />
                                    <Image source={{uri: modalContent?.image3}} style={{width: '100%', height: '100%'}} />
                                </ImagesContainer>
                            </View>
                            <InfoContainer>
                                <View style = {[styles.parallel, styles.strech]}>
                                    <Text style = {styles.boldText}> {modalContent?.date}</Text>
                                    <Text style = {styles.mediumText}>{modalContent?.minTemp}°C~{modalContent?.maxTemp}°C</Text>
                                </View>
                                <View style = {styles.parallel}>
                                    <Text style = {styles.mediumText}> {modalContent?.clothes}</Text>
                                    <EmojiComponent emoji = {modalContent?.satisfactionEmoji}/>
                                </View>
                                <View style = {styles.margin}>
                                    <Text style = {styles.lightText}> {modalContent?.comment}</Text>
                                </View>
                            </InfoContainer>
                        </ModalContainer>
                        <ButtonContainer>
                                <IconButton onPress={() => console.log('Edit pressed')} source={editIcon} />
                                <IconButton onPress={() => console.log('Delete pressed')} source={deleteIcon} />
                        </ButtonContainer>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    
                    <ImageContainer onPress={() => handleImagePress(item.postNo)}>
                        <Img 
                            //source={{ uri: item.imageUrl }} 
                            source={item.image}
                        />
                        <DateContainer><DateText>{item.date}</DateText></DateContainer>
                    </ImageContainer>
                )}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: Dimensions.get('window').height*0.055 }} 
            />
            <FloatingButton
                onPress={() => navigation.navigate('WearWriting')}
            >
                <AddWritingIcon></AddWritingIcon>
            </FloatingButton>
        </Container>
    )
}


const ModalContainer = styled.View`
    width: ScreenWidth* 0.75; 
`;

const ImagesContainer = styled.ScrollView`
    flex-direction: row;
    align-self: center;
`;

const InfoContainer = styled.View`
    margin-top: 10px;
    margin-left: 3px;
    width: 90%;
    height: 25%;
`;

//이모지
function getEmojiSource(emoji) {
    switch (emoji) {
        case 1:
            return require('../../assets/icons/best.png');
        case 2:
            return require('../../assets/icons/good.png');
        case 3:
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

//수정, 삭제 아이콘
const editIcon = require('../../assets/icons/edit.png');
const deleteIcon = require('../../assets/icons/delete.png');

const ButtonContainer = styled.View`
    position: absolute;
    bottom: 20px;
    right: 20px;
    flex-direction: row;
`;
const IconButton = ({ onPress, source }) => (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
        <Image source={source} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        marginTop: 0
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 15
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: ScreenWidth*0.85,
        height: ScreenHeight*0.7
    },

    buttonClose: {
        alignSelf: 'flex-end',
        marginRight: -7,
        marginTop: -10,
        marginBottom: 5,
        fontSize: 35,
        fontWeight: '600',
    },

    images:{
        width: ScreenWidth* 0.75,
        height: ScreenHeight* 0.42,
    },

    boldText:{
        fontSize: 23,
        fontWeight: '700',
    },
    mediumText:{
        fontSize: 23,
        fontWeight: '400',
    },
    lightText:{
        fontSize: 17,
        fontWeight: '300',
        marginLeft: '1%',
    },

    margin:{
        marginTop : 15,
    },
    parallel:{
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 5, 
    },
    strech:{
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 5, 
        width: ScreenWidth * 0.75,
        justifyContent: 'space-between',
    },

    emoji: {
        width: 25, 
        height: 25,
        marginLeft: 6,
    },
});

export default RecordGallery;