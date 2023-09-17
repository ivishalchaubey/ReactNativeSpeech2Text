import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const OutlineIconComp = ({
  image,
  width = 35,
  height = 35,
  onPress,
  backgroundColor = 'white',
}) => {
  return (
    <View style={{alignItems: 'flex-start'}}>
      <TouchableOpacity
        onPress={onPress}
        style={{backgroundColor, padding: 11, borderRadius: 55}}>
        <Image source={image} style={{width, height}} />
      </TouchableOpacity>
    </View>
  );
};

export default OutlineIconComp;
