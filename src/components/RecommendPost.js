import styled from 'styled-components/native';
import React from 'react';
import MyImage from './MyImage';



  
const PostContainer = styled.View`
    width: 80%;
    height: 35%;
    align-items: left;
    align-self: center;
    margin-top:20px;

`;

const ImageContainer = styled.View`
    
`;

const InfoContinaer = styled.View`
   margin-top: 5px;
`;
const DateContainer = styled.Text`
    font-family: 'GmarketSansTTFMedium';
    font-size: 20px;
`;
const TempContainer = styled.Text`
    font-family: 'GmarketSansTTFMedium';
    margin-top:5px;
    font-size: 25px;
`;

const ClothesAndSatisfactionIconContainer =styled.View`
    flex-direction: row;
    align-items: center;
`;
const ClothesContainer = styled.Text`
    font-size : 25px;
    margin-right: 10px;
    font-family: 'GmarketSansTTFMedium';
`;
const SatisfactionIcon = styled.Image`
    width: 30px;  
    height: 30px; 
`;
const getSatisfactionIcon = (satisfaction) => {
    switch (satisfaction) {
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
const CommentContainer = styled.Text`
    font-family: 'GmarketSansTTFMedium';
    margin-top: 5px;
    font-size:17px;
`;



const RecommendPost =  ({ postNo, postDate, minTemp, maxTemp, clothes, comment, satisfaction }) => {
    return(
        <PostContainer>
            <ImageContainer>
                <MyImage/>
            </ImageContainer>
            <InfoContinaer>
            <DateContainer> {postDate}</DateContainer>
            <TempContainer>{minTemp}°C ~ {maxTemp}°C</TempContainer>
            <ClothesAndSatisfactionIconContainer>
               <ClothesContainer>{clothes.join(', ')}</ClothesContainer>
               <SatisfactionIcon source={getSatisfactionIcon(satisfaction)} />
            </ClothesAndSatisfactionIconContainer>
           
            <CommentContainer>{comment}</CommentContainer>
            </InfoContinaer>
            

        </PostContainer>
    );
}


export default RecommendPost;