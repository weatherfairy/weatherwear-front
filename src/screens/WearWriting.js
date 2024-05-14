import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { TouchableWithoutFeedback,Alert, Keyboard, View,Text, Dimensions, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
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

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    const loadData = async () => {
      const storedMinTemp = await AsyncStorage.getItem('minTemp');
      const storedMaxTemp = await AsyncStorage.getItem('maxTemp');
      const today = new Date();
      const defaultdDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

      setDate(formatDate(route.params?.date) || formatDate(defaultdDate));
      setMinTemp(route.params?.minTemp || storedMinTemp || '');
      setMaxTemp(route.params?.maxTemp || storedMaxTemp || '');
      setClothesText(route.params?.clothesText || '');
      setReview(route.params?.review || '');
      setSatisfaction(route.params?.emoji || null);
    };

    loadData();
  }, []);

  const handleSatisfactionClick = (option)=>{
      setSatisfaction(option);
  };

  useEffect(() => {
    const fetchTemperature = async () => {
      const minTemperature = await AsyncStorage.getItem('minTemp');
      const maxTemperature = await AsyncStorage.getItem('maxTemp');
    };

    fetchTemperature();
  }, []);

  const selectPhotoTapped = () => {
    const options = {
      title: '사진 선택',
      cancelButtonTitle: '취소',
      takePhotoButtonTitle: '카메라로 촬영하기',
      chooseFromLibraryButtonTitle: '갤러리에서 선택하기',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
  
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setPhotos(source);
      }
    });
  };


  const handleSaveClick = async()=>{

    if(!clothesText || !review){
        Alert.alert('모든 필드를 입력해주세요');
        return;
    }
    if(!satisfaction){
        Alert.alert('만족도를 선택해주세요');
        return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('min', '20');
    formData.append('max', '30.0');
    formData.append('clothes' ,'맨투맨');
    formData.append('review', 'hihi');
    formData.append('emoji','1');
    formData.append('sky','1');
    // formData.append('image', {
    //   uri: 'https://picsum.photos/200/300', //나중에 실제 이미지로 변경
    //   type: 'image/jpeg',
    //   name: 'photo.jpeg'
    // });


    try {
        // Axios를 사용하여 FormData와 함께 POST 요청 보내기
        const response = await axios.post(
            'http://15.165.61.76:8080/api/v1/closet',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/formdata',
              },
            },
          );
        
        console.log(response.data); // 응답 데이터
        Alert.alert('성공', '데이터가 성공적으로 전송되었습니다.');
    } catch (error) {
        console.error(error); // 에러
        Alert.alert('오류', '데이터 전송 중 오류가 발생했습니다.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{flex: 1}}>
    <View style={{flex: 1}}>
    <AddPicture>
        <Text style = {styles.centered}>+</Text>
    </AddPicture> 
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