import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default function AddRecipe ( { navigation } ) {


  return (
    <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
      <Button title='Add with Image' onPress={ () => navigation.navigate( 'Add Image' ) } />
      <Button title='Add with Link' onPress={ () => navigation.navigate( 'Add Link' ) } />
      <Button title='Write Recipe' onPress={ () => navigation.navigate( 'Add Text' ) } />
    </View>


  );
}

