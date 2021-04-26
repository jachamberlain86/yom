import React from 'react'
import { View, Text } from 'react-native'

export default function UploadImage ({ route, navigation }) {
  console.log(route.params)
  return (
    <View>
      <Text>Image uploaded</Text>
    </View>
  )
}
