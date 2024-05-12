import React, {useState} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { Image,TouchableWithoutFeedback,Alert, Keyboard, View,Text, Dimensions, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
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


const WearWriting = () => {

//렌더링

const [clothes, inputClothes] = React.useState('');
const [review, inputReview] = React.useState('');
const [satisfaction, setSatisfaction] = useState(null);
const [photo, setPhoto] = useState(null);

const handleSatisfactionClick = (option)=>{
    setSatisfaction(option);
};

const selectPhotoTapped = async () => {
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
        quality: 1,
    });

    console.log('Response = ', result);

    //선택했다면
    if (!result.cancelled) {
      console.log("Image URI:", result.uri);
      setPhoto(result.uri);
  }
  
    
};


const handleSaveClick = async()=>{

    if(!clothes || !review){
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
    //   type: 'image/jpeg',
    //   name: 'photo.jpeg'
    // });
    if (photo) {
      const localUri = photo;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      // `photo`는 `uri`로부터 만든 blob 또는 다른 데이터 객체가 될 수 있습니다.
      formData.append('image', { uri: localUri, name: filename, type });
      console.log(filename);
  }


    try {
        // Axios를 사용하여 FormData와 함께 POST 요청 보내기
        const response = await axios.post(
            'http://223.194.159.105/api/v1/closet',
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


    const today = new Date();
    const date = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{flex: 1}}>
       <AddPicture onPress={selectPhotoTapped}>
                {photo ? (
                    <Image source={{ uri: photo }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                ) : (<Text style={styles.centered}>+</Text>)}
        </AddPicture>
    <View style={{flex: 1}}>

        <TodayInfoContainer>
         <Text style = {styles.lightText}>{date}</Text>
         <Text style = {[styles.boldText, styles.margin]}>-6°C~3°C</Text>
        </TodayInfoContainer>
        <ClothesText
            maxLength={40}
            textAlignVertical='top'
            multiline = {true}
            onChangeText = {inputClothes}
            value = {clothes}
            placeholder = "ex) 코트, 청바지, 니트" 
        />
        <ReviewText
            maxLength={50}
            textAlignVertical='top'
            multiline={true}
            onChangeText = {inputReview}
            value = {review}
            placeholder = "ex) 코트 입어서 추웠던 날" 
        />
        <SatisfactionContainer>
            <SatisfactionButton onPress = {()=>  handleSatisfactionClick(3)} name = "만족" style = {{backgroundColor:'#D0F0C0',marginRight: 8}} selected={satisfaction===3}/>
            <SatisfactionButton onPress = {()=>  handleSatisfactionClick(2)} name = "보통" style = {{backgroundColor:'#FFDB58', marginRight: 8}} selected={satisfaction===2}/>
            <SatisfactionButton onPress = {()=>  handleSatisfactionClick(1)} name = "불만족" style = {{backgroundColor:'#FC6C85'}} selected={satisfaction===1}/>
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