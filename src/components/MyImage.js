import React from 'react';
import { View, Image } from 'react-native';

const MyImage = () => (
  <View>
    <Image source={require('../../assets/images/example.png')} style={{width: 350, height: 400}} />
  </View>
);

export default MyImage;
