import React from 'react'
import { View, Text } from 'react-native'
import { uploadImage } from '../../../controllers/image.js'

export default function UploadImage ({ route, navigation }) {
  const { image } = route.params
  console.log(image)
  return (
    <View>
      <Text>Image uploaded</Text>
    </View>
  )
}
