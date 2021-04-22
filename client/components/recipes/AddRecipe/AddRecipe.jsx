import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AddLandingScreen from '../AddLanding/AddLanding.jsx';
import AddImageScreen from '../AddImage/AddImage.jsx';
import AddLinkScreen from '../AddLink/AddLink.jsx';
import AddTextScreen from '../AddText/AddText.jsx';

const Stack = createStackNavigator();
const EmptyScreen = () => {
  return ( null );
};

export default function AddRecipe ( { navigation } ) {


  return (
    <Stack.Navigator initialRouteName='Add Recipe Landing'>
      <Stack.Screen name='Add Landing' component={ AddLandingScreen } />
      <Stack.Screen name='Add Image' component={ AddImageScreen } />
      <Stack.Screen name='Add Link' component={ AddLinkScreen } />
      <Stack.Screen name='Add Text' component={ AddTextScreen } />
    </Stack.Navigator>

  );
}
