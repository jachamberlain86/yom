import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase'
import { nanoid } from '@reduxjs/toolkit'

export default function AddImage ({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

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

  async function uploadImage (uri) {
    const childPath = `post/${firebase.auth().currentUser.uid}/${nanoid()}`
    console.log(childPath)
    const response = await window.fetch(uri)
    const blob = await response.blob()

    const uploadTask = firebase.storage().ref().child(childPath).put(blob)

    const result = await uploadTask.on('state_changed',
      (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
            break
        }
      },
      (error) => {
      // Handle unsuccessful uploads
        console.log(error)
      },
      () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL)
          submitToGoogle(downloadURL)
        })
      }
    )
    return result
  }

  async function submitToGoogle (image) {
    try {
      const body = JSON.stringify({
        requests: [
          {
            features: [
              { type: 'TEXT_DETECTION', maxResults: 10 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 10 }
            ],
            image: {
              source: {
                imageUri: image
              }
            }
          }
        ]
      })
      console.log(body)
      const response = await window.fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
        process.env.GOOGLE_CLOUD_VISION_API_KEY,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: body
        }
      )
      const parsedResponse = await response.json()
      console.log('parsed response: ', parsedResponse)
      navigation.navigate('Upload Image', parsedResponse.responses)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = async () => {
    console.log('uploading')
    const result = await uploadImage(image)
    console.log('uploaded ', result)
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
