import styled from 'styled-components/native';
import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';


const PostContainer = styled.View`
    height: ${ScreenHeight * 0.6}px;
    width: ${ScreenWidth * 0.8}px;
    align-items: left;
    align-self: center;
    margin-top:50px;
`;

const ImagesContainer = styled.ScrollView`
   align-self: center;
   height: ${ScreenHeight * 0.4}px;
   width: ${ScreenWidth * 0.8}px;
`;

/*
const ImageComponent = ({ imageUrls = [] }) => (
    <ImagesContainer
      horizontal={true}
      showsHorizontalScrollIndicator={true}     
    >
    {imageUrls.map((url, index) => (
      <Image 
        key = {index}
        source = {{uri: url}}
        style={{ width: ScreenWidth * 0.8, height: ScreenHeight * 0.4, resizeMode: 'contain', marginRight: 10 }}//contain: 비율유지, stretch: 비율유지x
      />
    ))}
    </ImagesContainer>
);*/

const ImageComponent = ({image1, image2, image3} ) => (
  <ImagesContainer
    horizontal={true}
    showsHorizontalScrollIndicator={true}     
  >
  <Image 
      source = {{uri: image1}}
      style={{ width: ScreenWidth * 0.8, height: ScreenHeight * 0.4, resizeMode: 'contain', marginRight: 10 }}//contain: 비율유지, stretch: 비율유지x
    />
    <Image 
      source = {{uri: image2}}
      style={{ width: ScreenWidth * 0.8, height: ScreenHeight * 0.4, resizeMode: 'contain', marginRight: 10 }}//contain: 비율유지, stretch: 비율유지x
    />
    <Image 
      source = {{uri: image3}}
      style={{ width: ScreenWidth * 0.8, height: ScreenHeight * 0.4, resizeMode: 'contain', marginRight: 10 }}//contain: 비율유지, stretch: 비율유지x
    />
  </ImagesContainer>
);



const InfoContinaer = styled.View`
    margin-top: 5px;
`;

const getSkyIcon = (sky) => {
    switch (sky) {
      case 1:
        return require('../../assets/icons/sunny.png');
      case 2:
        return require('../../assets/icons/foggy.png');
      case 3:
        return require('../../assets/icons/cloudy.png');
      case 4:
        return require('../../assets/icons/snow&rain.png');
      case 5:
        return require('../../assets/icons/rainy.png');
      case 6:
        return require('../../assets/icons/snowy.png');
      case 7:
        return require('../../assets/icons/windy.png');
      default:
        return null; 
    }
};



const getSatisfactionIcon = (emoji) => {
    switch (emoji) {
      case 1:
        return require('../../assets/icons/bad.png');
      case 2:
        return require('../../assets/icons/good.png');
      case 3:
        return require('../../assets/icons/best.png');
      default:
        return null; 
    }
};


const styles = StyleSheet.create({
  comment:{
    fontFamily: 'GmarketSansTTFMedium',
    marginTop: 10,
    fontSize :17,
    height: 20,

  },
  temp:{
    fontFamily: 'GmarketSansTTFLight',
    fontSize: 18,
  },
  date:{
    fontFamily: 'GmarketSansTTFLight',
    fontSize: 15,
  },
  emoji:{
    width: 30,  
    height: 30,
  },
  clothes:{
    fontSize : 25,
    marginRight: 10,
    fontFamily: 'GmarketSansTTFMedium',
  },
  sky:{
    width: 25,
    height: 25,
  },
  parallel:{
    flexDirection:'row',
    alignItems: 'center',
  
  },
  topTitle:{
    width: '98%',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

})



const RecommendPost =  ({ postNo, postDate, minTemp, maxTemp, sky, clothes, comment, emoji, image1, image2, image3}) => {
    

    return(
        <PostContainer>
            <View style = {styles.topTitle}>
            <Text style = {styles.date}> {postDate}</Text>
            <View style = {styles.parallel}>
            <Text style = {styles.temp}>{minTemp}°C ~ {maxTemp}°C </Text>
            <Image style = {styles.sky} source = {getSkyIcon(sky)}/>
            </View>
            </View>
            <ImageComponent image1 = {image1} image2 = {image2} image3 = {image3}/>
            <InfoContinaer>           
            <View style = {styles.parallel}>
               <Text style = {styles.clothes}>{clothes.join(', ')}</Text>
               <Image style = {styles.emoji} source={getSatisfactionIcon(emoji)} />
            </View>
           
            <Text style = {styles.comment}> {comment}</Text>
            </InfoContinaer>
            

        </PostContainer>
    );
}


export default RecommendPost;
