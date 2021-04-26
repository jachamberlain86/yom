import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage, submitToGoogle } from '../../../controllers/image.js'

export default function AddImage ({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [uploading, setUploading] = useState(false)
  const [googleResponse, setGoogleResponse] = useState(null)

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === 'granted')
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.uri)
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    console.log('pick image result ', result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const handleUpload = async () => {
    console.log('uploading')
    const result = await uploadImage(image)
    console.log('uploaded ', result)
    setUploading(true)
    const response = await submitToGoogle(result)
    console.log('sent to google')
    console.log('response ', response)
    setGoogleResponse(response)
    setUploading(false)
    navigation.navigate('Upload Image', { response: googleResponse })
  }

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>
  }

  const cameraControls = image
    ? null
    : (
      <View style={{ flex: 1 }}>
        <View style={styles.cameraContainer}>
          <Camera
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio='1:1'
          />
        </View>
        <Button
          title='Change camera'
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }}
        />
        <Button
          title='Take picture'
          onPress={() => { takePicture() }}
        />
        <Button
          title='Pick image from gallery'
          onPress={() => { pickImage() }}
        />
      </View>
      )

  const selectedImage = image
    ? (
      <View style={{ flex: 1 }}>
        <View style={styles.cameraContainer}>
          <Image source={{ uri: image }} style={styles.fixedRatio} />
        </View>
        <Button
          title='UPLOAD'
          onPress={() => {
            {
              console.log('pressed upload')
              handleUpload() }
          }}
        />
        <Button
          title='CANCEL'
          onPress={() => setImage(null)}
        />
      </View>
      )
    : null

  return (
    <View style={{ flex: 1 }}>
      {cameraControls}
      {selectedImage}
    </View>
  )
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
})
