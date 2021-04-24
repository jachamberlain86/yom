import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { styles } from '../../../styles/app.jsx'

export default function AddRecipe ({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title='Add with Image' onPress={() => navigation.navigate('Add Image')} />
      <Button title='Add with Link' onPress={() => navigation.navigate('Add Link')} />
      <Button title='Write Recipe' onPress={() => navigation.navigate('Add Text')} />
    </View>

  )
}
