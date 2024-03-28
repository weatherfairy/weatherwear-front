import styled from 'styled-components/native';
import {Dimensions, FlatList, Alert, Modal, StyleSheet, Text, Pressable, View, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import MyImage from './MyImage';
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

const ImageComponent = ({ imageUrls }) => (
    <ImagesContainer
        horizontal={true}
        showsHorizontalScrollIndicator={true}     
    >
        {imageUrls.map((imageUrl, index) => (
            <MyImage key={index} imageSource={imageUrl} />
        ))}
    </ImagesContainer>
);

const InfoContinaer = styled.View`
    margin-top: 5px;
`;

/*const getSkyIcon = (sky) => {
    switch (sky) {
        case 1:
            return require('../../assets/icons/color_weather/clear_day.png');
        case 2:
            return require('../../assets/icons/color_weather/windy.png');
        case 3:
            return require('../../assets/icons/color_weather/cloudy_day.png');
        case 4:
            return require('../../assets/icons/color_weather/rain.png');
        case 5:
            return require('../../assets/icons/color_weather/overcast.png');
        case 6:
            return require('../../assets/icons/color_weather/sleet.png');
        case 7:
            return require('../../assets/icons/color_weather/snow.png');
        default:
            return null; 
    }
};*/

const DateAndTempContainer = styled.View`
    width: 100%;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    
`;

const ClothesAndEmojiContainer =styled.View`
    flex-direction: row;
    align-items: center;
`;

const getSatisfactionIcon = (emoji) => {
    switch (emoji) {
        case 1:
            return require('../../assets/icons/best.png');
        case 2:
            return require('../../assets/icons/good.png');
        case 3:
            return require('../../assets/icons/bad.png');
        default:
            return null; 
    }
};

const styles = StyleSheet.create({
    comment:{
        fontFamily: 'GmarketSansTTFMedium',
        marginTop: 5,
        fontSize :17,
        backgroundColor : 'pink',
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
    }
});

const RecommendPost =  ({ postNo, postDate, minTemp, maxTemp, skdy, clothes, comment, emoji }) => {
    const imageUrls = [
        require('../../assets/images/example.png'),
        require('../../assets/images/example.png'),
        require('../../assets/images/example.png')
    ];
    
    return(
        <PostContainer>
            <DateAndTempContainer>
            <Text style = {styles.date}> {postDate}</Text>
            <Text style = {styles.temp}>{minTemp}°C ~ {maxTemp}°C</Text>
            </DateAndTempContainer>
            <ImageComponent imageUrls={imageUrls}/>
            <InfoContinaer>           
            <ClothesAndEmojiContainer>
                <Text style = {styles.clothes}>{clothes.join(', ')}</Text>
                <Image style = {styles.emoji} source={getSatisfactionIcon(emoji)} />
            </ClothesAndEmojiContainer>

            <Text style = {styles.comment}>{comment}</Text>
            </InfoContinaer>
        </PostContainer>
    );
}


export default RecommendPost;