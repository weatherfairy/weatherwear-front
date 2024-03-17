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
    font-size: 30px;
`;
const TempContainer = styled.Text`
    font-size: 40px;
`;

const ClothesAndSatisfactionIconContainer =styled.View`
    flex-direction: row;
    align-items: center;
`;
const ClothesContainer = styled.Text`
    font-size : 40px;
    margin-right: 5px;
`;
const SatisfactionIcon = styled.Image`
  width: 50px;  
  height: 50px;  
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
    font-size:20px;
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