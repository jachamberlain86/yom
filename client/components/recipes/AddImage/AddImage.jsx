import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function AddImage () {


  return (
    <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
      <Text>Take a photo</Text>
    </View>
  );
}