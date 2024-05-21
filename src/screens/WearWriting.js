import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { TouchableWithoutFeedback,Alert, Keyboard, View,Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');

const AddPicture = styled.TouchableOpacity`
  background-color: lightgray;
  margin-top: ${ScreenHeight * 0.09}px;
  width: ${ScreenWidth * 0.3}px;
  height: ${ScreenWidth * 0.3}px;
  align-self: center;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
const TodayInfoContainer = styled.View`
    align-items: center;
    margin-top: ${ScreenHeight * 0.04}px;
`;
const ClothesText = styled.TextInput`
  background-color: lightgray;
  margin-top: ${ScreenHeight * 0.03}px;
  width: ${ScreenWidth * 0.7}px;
  height: ${ScreenHeight * 0.06}px;
  border-radius: 5px;
  align-self: center;
  font-size: 20px;
`;
const ReviewText = styled.TextInput`
  background-color: lightgray;
  margin-top: ${ScreenHeight * 0.03}px;
  width: ${ScreenWidth * 0.7}px;
  height: ${ScreenWidth * 0.2}px;
  align-self: center;
  border-radius: 5px;
  font-size: 20px;
`;

const WearWriting = ({route, navigation}) => {
  const [date, setDate] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [clothesText, setClothesText] = useState('');
  const [review, setReview] = useState('');
  const [satisfaction, setSatisfaction] = useState(null);
  const [photos, setPhotos] = useState([null, null, null]);
  const [editMode, setEditMode] = useState(false);
  const [postNo, setPostNo] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    console.log("satisfaction: ", satisfaction);
    const loadData = async () => {
      const storedMinTemp = await AsyncStorage.getItem('minTemp');
      const storedMaxTemp = await AsyncStorage.getItem('maxTemp');
      const today = new Date();
      const defaultdDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      const images = route.params?.images || [null, null, null];

      setDate(formatDate(route.params?.date) || formatDate(defaultdDate));
      setMinTemp(route.params?.minTemp || storedMinTemp || '');
      setMaxTemp(route.params?.maxTemp || storedMaxTemp || '');
      setClothesText(route.params?.clothesText || '');
      setReview(route.params?.review || '');
      setSatisfaction(route.params?.emoji ?? null);
      setPhotos(images);
      setEditMode(route.params?.isEditMode || false);
      setPostNo(route.params?.postNo || null);
      console.log("satisfaction: ", satisfaction);
    };

    loadData();
  }, []);

  const handleSatisfactionClick = (option)=>{
    console.log(`Selected satisfaction level before setting state: ${option}`); // 상태 설정 전 로그
    setSatisfaction(option);
    console.log(`Selected satisfaction level after setting state: ${satisfaction}`); // 상태 설정 후 로그
  };

  useEffect(() => {
    console.log(`Satisfaction updated to: ${satisfaction}`);
  }, [satisfaction]);

  const selectPhotoTapped = async (index) => {
    // 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('사진 라이브러리 접근 권한이 필요합니다.');
      return;
    }

    // 이미지 선택
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;

      setPhotos(currentPhotos => {
        const newPhotos = [...currentPhotos];
        newPhotos[index] = uri;
        return newPhotos;
      });
    }
  };

  const handleSaveClick = async()=>{
    console.log(`Saving with satisfaction: ${satisfaction}`);
    if(!clothesText || !review || photos.some(photo => photo === null)){
        Alert.alert('모든 필드를 입력해주세요');
        return;
    }
    if(satisfaction === null || satisfaction === undefined){
        Alert.alert('만족도를 선택해주세요');
        return;
    }

    const skyIcon = await AsyncStorage.getItem('skyIcon');

    // FormData 객체 생성
    const formData = new FormData();

    formData.append('clothes' ,clothesText);
    formData.append('review', review);
    formData.append('emoji',satisfaction);
    photos.forEach((photo, index) => {
        if (photo) {
            const uri = photo;
            // const filename = uri.split('/').pop();
            // const match = /\.(\w+)$/.exec(filename);
            // const type = match ? `image/${match[1]}` : `image`;
            const filename = `image${index + 1}.jpg`; // 기본 파일 이름 설정
            const type = 'image/jpeg'; // 기본 이미지 타입 설정
            formData.append(`image${index + 1}`, { uri, name: filename, type });
        }
    });


    // try {
    //     // Axios를 사용하여 FormData와 함께 POST 요청 보내기
    //     const userToken = await AsyncStorage.getItem('userToken');
    //     const response = await axios.post(
    //         'http://15.165.61.76:8080/api/v1/closet',
    //         formData,
    //         {
    //           headers: {
    //             'Content-Type': 'multipart/formdata',
    //             'Authorization': userToken,
    //           },
    //         },
    //       );
        
    //     console.log(response.data); // 응답 데이터
    //     Alert.alert('성공', '데이터가 성공적으로 전송되었습니다.');
    //     navigation.navigate('WearMain', {screen: '내 기록'});
    // } catch (error) {
    //     console.error(error); // 에러
    //     Alert.alert('오류', '데이터 전송 중 오류가 발생했습니다.');
    // }
    try{
      const userToken = await AsyncStorage.getItem('userToken');
      if (editMode) {
        console.log("editMode");
        console.log("http://15.165.61.76:8080/api/v1/closet/"+postNo);
        const response = await axios.put(
          `http://15.165.61.76:8080/api/v1/closet/${postNo}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/formdata',
              'Authorization': userToken,
            },
          },
        );
        console.log(response.data);
        Alert.alert('수정성공', '수정된 데이터가 성공적으로 전송되었습니다.');
        navigation.navigate('WearMain', {screen: '내 기록'});
      } else {
        formData.append('min', minTemp.toString());
        formData.append('max', maxTemp.toString());
        formData.append('sky',skyIcon);

        const response = await axios.post(
          'http://15.165.61.76:8080/api/v1/closet',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/formdata',
              'Authorization': userToken,
            },
          },
        );
        
        console.log(response.data); // 응답 데이터
        Alert.alert('성공', '데이터가 성공적으로 전송되었습니다.');
        navigation.navigate('WearMain', {screen: '내 기록'});
      }
    } catch (error) {
      if (error.response) {
        // 서버가 4xx 또는 5xx 응답을 반환한 경우
        console.error('Server responded with an error:', error.response.data);
        Alert.alert(`Error: ${error.response.status} - ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        // 요청이 서버에 도달하지 못한 경우
        console.error('No response received:', error.request);
        Alert.alert('No response received from server. Please try again later.');
      } else {
        // 요청을 설정하는 도중에 오류가 발생한 경우
        console.error('Error in setting up the request:', error.message);
        Alert.alert(`Request error: ${error.message}`);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, width: '100%' }}>
            {photos.map((photo, index) => (
              <AddPicture key={index} onPress={() => selectPhotoTapped(index)}>
                {photo ? (
                  <Image source={{ uri: photo }} style={{ width: ScreenWidth * 0.3, height: ScreenWidth * 0.3, borderRadius: 10 }} />
                ) : (
                  <Text style={styles.centered}>+</Text>
                )}
              </AddPicture>
            ))}
        </View>
        <View style={{flex: 1}}>
            <TodayInfoContainer>
              <Text style = {styles.lightText}>{date}</Text>
              <Text style = {[styles.boldText, styles.margin]}>{minTemp}°C~{maxTemp}°C</Text>
            </TodayInfoContainer>
            <ClothesText
                maxLength={40}
                textAlignVertical='top'
                multiline = {true}
                onChangeText = {setClothesText}
                value = {clothesText}
                placeholder = "ex) 코트, 청바지, 니트" 
            />
            <ReviewText
                maxLength={50}
                textAlignVertical='top'
                multiline={true}
                onChangeText = {setReview}
                value = {review}
                placeholder = "ex) 코트 입어서 추웠던 날" 
            />
            
            <SatisfactionContainer>
                <SatisfactionButton onPress = {()=>  handleSatisfactionClick(0)} name = "만족" style = {{backgroundColor:'#D0F0C0',marginRight: 8}} selected={satisfaction===0}/>
                <SatisfactionButton onPress = {()=>  handleSatisfactionClick(1)} name = "보통" style = {{backgroundColor:'#FFDB58', marginRight: 8}} selected={satisfaction===1}/>
                <SatisfactionButton onPress = {()=>  handleSatisfactionClick(2)} name = "불만족" style = {{backgroundColor:'#FC6C85'}} selected={satisfaction===2}/>
            </SatisfactionContainer>
        </View>
        <View style={{marginBottom: 30}}>
          <SaveButton onPress={handleSaveClick} name="저장"/>
        </View>
      </View>
    </TouchableWithoutFeedback>
    );
};

const SatisfactionContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  margin-top: ${ScreenHeight * 0.04}px;
`;


const SaveButton = ({ onPress, name ,style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.saveButton,style]}>
      <Text style = {styles.saveButtonText}>{name}</Text>
    </TouchableOpacity>
  );

const SatisfactionButton = ({onPress, name, style, selected}) =>(
    <TouchableOpacity 
        onPress = {onPress} 
        style= {[styles.satisfactionButton, style, selected ? styles.selectedButton: null,]}>
        <Text style = {styles.satisfactionText}>{name}</Text>
    </TouchableOpacity>
);



const styles = StyleSheet.create({
    centered:{
        alignSelf:'center',
        fontSize: 40,
    },
    saveButton:{
      backgroundColor:'#87CEEB',    
      borderRadius: 5, 
      width: ScreenWidth * 0.9,
      alignSelf: "center",
      height: ScreenHeight * 0.045,
      justifyContent: "center",
      marginBottom: ScreenHeight * 0.04,
      
    },
    saveButtonText:{
      fontSize: 30,
      textAlign: "center",
    },
    satisfactionButton:{
        width: 110, 
        height: 45, 
        borderRadius: 50,
        alignItems:'center',
        justifyContent:'center',
    },
    satisfactionText:{
        fontSize: 17,
    },
    selectedButton: {
        borderWidth: 2, // 테두리 두께
        borderColor: 'black', // 테두리 색상
    },
    
    lightText:{
        fontSize: 30,
        fontWeight: '200',
    },
    boldText:{
        fontSize: 40,
        fontWeight: '400',
    },
    margin:{
        marginTop:ScreenHeight * 0.02,
    },
    input:{
        backgroundColor: "lightgray",
        width: ScreenWidth * 0.7,
        height:ScreenHeight *0.1,
        borderRadius:7,
        alignSelf: 'center',
        marginTop: ScreenHeight*0.03,
        fontSize: 20,
    },
});


export default WearWriting;