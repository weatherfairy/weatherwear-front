import React from 'react';
import { View, Image } from 'react-native';

const MyImage = ({imageSource}) => (
    <View style={{ marginRight: 10 }}>
        <Image source={imageSource} style={{width: 350, height: 450}} />
    </View>
);

export default MyImage;