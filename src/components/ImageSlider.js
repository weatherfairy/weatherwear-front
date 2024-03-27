import React from 'react';
import { View, StyleSheet, Image, FlatList, Dimensions } from 'react-native';

const images = [
  { id: '1', uri: require('../../assets/images/example.png') },
  { id: '2', uri: require('../../assets/images/example.png') },
  { id: '3', uri: require('../../assets/images/example.png') },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImageSlider = () => {
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={item.uri} style={styles.image} />
        </View>
      )}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: windowWidth, // 화면 너비에 맞춰서 이미지 컨테이너 크기를 설정
    height: windowHeight * 0.4, // 예를 들어 화면 높이의 40%로 설정
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
});

export default ImageSlider;
