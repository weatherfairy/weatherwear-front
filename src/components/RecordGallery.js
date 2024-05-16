import styled from 'styled-components/native';
import {Dimensions, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, {useEffect, useState, useCallback} from 'react';
import DetailModal from './DetailModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Container = styled.View`
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
    width: ${Dimensions.get('window').width/6}px;
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
const AddWritingIcon = styled(MaterialIcons).attrs(({theme}) => ({
    name: 'add',
    size: Dimensions.get('window').height/24,
    color: theme.wearText
}))``;

const RecordGallery = ({ navigation, filterParams }) => {
    const [imageData, setImageData] = useState([]);

    // useEffect(() => {
    //     fetchImageData();
    // }, [filterParams]);

    const fetchImageData = useCallback(async () => {
        try {
            const url = `http://15.165.61.76:8080/api/v1/closet/lists?${filterParams}`
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                },
            });

            const jsonResponse = await response.json();
            setImageData(jsonResponse);
                //setHasMore(!jsonResponse.last); //마지막 페이지인지 확인
                //setPage(newPage); //현재 페이지 상태 업데이트
                //console.log(jsonResponse);
            console.log('url: ', url);
            console.log(jsonResponse);
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    }, [filterParams]);

    useFocusEffect(
        useCallback(() => {
            fetchImageData();
        }, [fetchImageData])
    )

    // 날짜 포맷 변경 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(2); // 년도의 마지막 두 자리
        const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
        const day = date.getDate(); // 일
        return `${year}/${month}/${day}`;
    };

    //상세보기 모달창
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);//모달에 표시할 내용

    const fetchDataFromServer = async (postNo) => {
        try {
            const url = `http://15.165.61.76:8080/api/v1/closet/lists/${postNo}`
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("url: ", url);
                //console.log("어떤 데이터? ",data);
                return data;
            } else {
                throw new Error('서버로부터 응답을 받는 데 실패했습니다.');
            }
        } catch (error) {
            console.log("에러", error.message);
            return null;
        }
        
    };


    const handleImagePress = async (postNo, date) => {
        const dataFromServer = await fetchDataFromServer(postNo);    
        console.log("게시글 번호: ", postNo);    
        
        if (dataFromServer) {
            console.log("로드 성공", dataFromServer);
            setModalContent({ ...dataFromServer, date, postNo });
            setModalVisible(true);
        }
        if (!dataFromServer) {
            console.log("로드 실패");
        }
    };


    const removePostFromGallery = async (postNo) => {
        const newImageData = imageData.filter(item => item.postNo !== postNo);
        setImageData(newImageData);
    };

    return (
        <Container>
            <FlatList
                data={imageData}
                renderItem={({item}) => (
                    <ImageContainer onPress={() => handleImagePress(item.postNo, item.date)}>
                        <Img source={{ uri: item.imageUrl }}/>
                        <DateContainer><DateText>{formatDate(item.date)}</DateText></DateContainer>
                    </ImageContainer>
                )}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 5 }} />

            <DetailModal 
                visible={modalVisible} 
                modalContent={modalContent}
                onClose={() => setModalVisible(false)} 
                onDeleteSuccess={removePostFromGallery}
                navigation={navigation}
            />
            <FloatingButton
                onPress={() => navigation.navigate('WearWriting')}
            >
                <AddWritingIcon/>
            </FloatingButton>
        </Container>
    )
}

export default RecordGallery;