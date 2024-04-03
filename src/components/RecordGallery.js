import styled from 'styled-components/native';
import {Dimensions, FlatList, Alert, Modal, StyleSheet, Text, Pressable, View, Image,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

const data = [
    {postNo: '1', date: '1/25', postImageUrl: require('../../assets/images/example.png')},
    {postNo: '2', date: '1/26'},
    {postNo: '3',  date: '1/27', postImageUrl: require('../../assets/images/example.png')},
    {postNo: '4',  date: '1/29'},
    {postNo: '5',  date: '1/28', postImageUrl: require('../../assets/images/example.png')},
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
    {postNo: '21',  date: '1/25'},
    {postNo: '22', date: '1/25', postImageUrl: require('../../assets/images/example.png')},
    {postNo: '23', date: '1/26'},
    {postNo: '24',  date: '1/27', postImageUrl: require('../../assets/images/example.png')},
    {postNo: '25',  date: '1/29'},
    {postNo: '26',  date: '1/28', postImageUrl: require('../../assets/images/example.png')},
    {postNo: '27', date: '1/30'},
    {postNo: '28',  date: '2/2'},
    {postNo: '29',  date: '2/4'},
    {postNo: '30',  date: '2/1'},
    {postNo: '31', date: '2/5'},
    {postNo: '32',  date: '1/25'},
    {postNo: '33',  date: '1/26'},
    {postNo: '34',  date: '1/27'},
    {postNo: '35',  date: '1/29'},
    {postNo: '36',  date: '1/28'},
    {postNo: '37',  date: '1/30'},
    {postNo: '38',  date: '2/2'},
    {postNo: '39',  date: '2/4'},
    {postNo: '40',  date: '2/1'},
    {postNo: '41',  date: '2/5'}
];
const Container = styled.SafeAreaView`
    flex: 1;
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
    width: ${Dimensions.get('window').height/16}px;
    height: ${Dimensions.get('window').height/16}px;
    background-color: ${({theme}) => theme.wearBackground};
    border-radius: ${Dimensions.get('window').height/32}px;
    position: absolute;
    bottom: ${Dimensions.get('window').height*0.025}px;
    right: ${Dimensions.get('window').height*0.02}px;
    justify-content: center;
    align-items: center;
    elevation: 15;
    shadow-color: ${({theme}) => theme.wearText};
    shadow-opacity: 0.3;
    shadow-radius: 3px;
`;
const AddWritingIcon = styled(FontAwesome6).attrs(({theme}) => ({
    name: 'add',
    size: Dimensions.get('window').height/24,
    color: theme.wearText
}))``;
const RecordGallery = ({ navigation }) => {
    const [imageData, setImageData] = useState([]);
    const [page, setPage] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    /*useEffect(() => {
        const fetchImageData = async () => {
            try {
                const queryParams = new URLSearchParams({
                    page: 0,
                    size: 24
                }).toString();
                //const response = await fetch('http://223.194.158.167:8080/api/v1/closet/lists', {
                //method: 'GET'
                const response = await fetch(`http://15.165.61.76:8080/api/v1/closet/list?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
}, []);*/
    useEffect(() => {
        fetchImageData();
    }, []);

    const fetchImageData = async (newPage = page) => {
        if (!hasMore && newPage !== 0) return; // 더 이상 불러올 페이지가 없으면 요청하지 않음
        
        try {
            const queryParams = new URLSearchParams({
                page: newPage,
                size: 24,
            }).toString();

            const response = await fetch(`http://15.165.61.76:8080/api/v1/closet/list?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const jsonResponse = await response.json();
            if (jsonResponse.content) {
                if (newPage === 0) {
                    setImageData(jsonResponse.contet)
                } else {
                    setImageData(prevData => [...prevData, ...jsonResponse.content]);
                }
                setHasMore(!jsonResponse.last); //마지막 페이지인지 확인
                setPage(newPage); //현재 페이지 상태 업데이트
                //console.log(jsonResponse);
            }
            console.log(jsonResponse);
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchImageData(0);
        setIsRefreshing(false);
    };

    const handleLoadMore = () => {
        if (hasMore) {
            fetchImageData(page + 1);
        }
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);//모달에 표시할 내용

    const fetchDataFromServer = async (postNo) => {
        
        try {
            //const response = await fetch(`http://223.194.157.73:8080/api/v1/closet/lists/1`);
            const response = await fetch('http://15.165.61.76:8080');
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
            image1: 'https://picsum.photos/id/237/200/300',
            image2: 'https://picsum.photos/id/237/200/300',
            image3: 'https://picsum.photos/id/237/200/300',
            emoji: 1, 
            review: "오늘의 코멘트는요..뭘로 할까요,, 모르겠어요!!! 우리 캡스톤은 5/31일 발표예요ㅎ-ㅎ",
            clothesText: "티셔츠, 청바지, 운동화",
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
                                    <Text style = {styles.mediumText}> {modalContent?.clothesText}</Text>
                                    <EmojiComponent emoji = {modalContent?.emoji}/>
                                </View>
                                <View style = {styles.margin}>
                                    <Text style = {styles.lightText}> {modalContent?.review}</Text>
                                </View>
                            </InfoContainer>
                        </ModalContainer>
                        <ButtonContainer>
                                <IconButton onPress={() => console.log('Edit pressed')}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onPress={() => console.log('Delete pressed')}>
                                    <DeleteIcon/>
                                </IconButton>
                        </ButtonContainer>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={imageData}
                renderItem={({item}) => (
                    
                    <ImageContainer onPress={() => handleImagePress(item.postNo)}>
                        <Img 
                            //source={{ uri: item.postImageUrl }} 
                            source={item.postImageUrl}
                        />
                        <DateContainer><DateText>{item.date}</DateText></DateContainer>
                    </ImageContainer>
                )}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: Dimensions.get('window').height*0.055 }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.7} // 목록의 70% 지점에서 다음 페이지 로드
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
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

const ButtonContainer = styled.View`
    position: absolute;
    bottom: 5px;
    right: 5px;
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
        fontSize: ScreenHeight*0.03,
        fontWeight: '600',
    },

    images:{
        width: ScreenWidth* 0.75,
        height: ScreenHeight* 0.4,
    },

    boldText:{
        fontSize: ScreenHeight*0.03,
        fontWeight: '700',
    },
    mediumText:{
        fontSize: ScreenHeight*0.03,
        fontWeight: '400',
    },
    lightText:{
        fontSize: ScreenHeight*0.02,
        fontWeight: '300',
        marginLeft: '1%',
    },

    margin:{
        marginTop : 10,
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