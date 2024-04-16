import React, {useState} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { TouchableWithoutFeedback,Alert, Keyboard, View,Text, Dimensions, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');


const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    return result === RESULTS.GRANTED;
  } else if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return result === RESULTS.GRANTED;
  }
  return false;
};



  


const AddPicture = styled.View`
  background-color: lightgray;
  margin-top: ${ScreenHeight * 0.09}px;
  width: ${ScreenWidth * 0.3}px;
  height: ${ScreenWidth * 0.3}px;
  align-self: center;
  border-radius: 10px;
  justify-content: center;
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
const [photos, setPhotos] = useState([]);


const selectImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      alert('사진 라이브러리 접근 권한이 필요합니다.');
      return;
    }
  
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setPhotos(prevPhotos => {
          return prevPhotos.length < 3 ? [...prevPhotos, source] : prevPhotos;
        });
      }
    });
  };
  

const handleSatisfactionClick = (option)=>{
    setSatisfaction(option);
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
    //   uri: 'https://picsum.photos/200/300', //나중에 실제 이미지로 변경
    //   type: 'image/jpeg',
    //   name: 'photo.jpeg'
    // });
    photos.forEach((photo, index) => {
        formData.append(`image${index + 1}`, {
          uri: photo.uri,
          type: 'image/jpeg',
          name: `photo${index + 1}.jpg`,
        });
      });
      
      


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


    const today = new Date();
    const date = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{flex: 1}}>
    <View style={{flex: 1}}>
        <AddPicture onPress={photos.length < 3 ? selectImage : null}>
            {photos.map((photo, index) => (
                <Image key={index} source={{ uri: photo.uri }} style={styles.imagePreview} />
            ))}
            {photos.length < 3 && <Text style={styles.centered}>+</Text>}
        </AddPicture>

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
        <SaveButton>
            <ButtonText>저장</ButtonText>
        </SaveButton>
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

/*
const SaveButton = ({ onPress, name ,style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.saveButton,style]}>
      <Text style = {styles.saveButtonText}>{name}</Text>
    </TouchableOpacity>
  );
*/
const SaveButton = styled.TouchableOpacity`
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
`;

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
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },      
});


export default WearWriting;
