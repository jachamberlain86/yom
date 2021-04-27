import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase'
import { nanoid } from '@reduxjs/toolkit'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles, colors } from '../../../styles/app.jsx'

export default function AddImage ({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState(null)

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

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  async function handleUpload () {
    // await uploadLocalImage(image)
    await uploadImage(image)
  }

  async function uploadImage (uri) {
    const childPath = `post/${firebase.auth().currentUser.uid}/${nanoid()}`
    const response = await window.fetch(uri)
    const blob = await response.blob()

    const uploadTask = firebase.storage().ref().child(childPath).put(blob)

    const result = await uploadTask.on('state_changed',
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + uploadProgress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
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
      setUploading(null)
      setImage(null)
      navigation.navigate('Upload Image', { text: parsedResponse.responses[0].fullTextAnnotation.text })
    } catch (error) {
      console.log(error)
    }
  }

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>
  }

  const cameraControls = image || uploading
    ? null
    : (
      <View style={styles.inputImageContainer}>
        <View style={styles.cameraContainer}>
          <Camera
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio='1:1'
          />
        </View>

        <Pressable
          style={styles.cameraButton}
          onPress={() => {
            takePicture()
          }}
        />
        <Pressable
          style={styles.galleryButton}
          onPress={() => { pickImage() }}
        >
          <MaterialCommunityIcons name='image-multiple' color={colors.yomWhite} size={26} />
        </Pressable>
      </View>
      )

  const selectedImage = image && !uploading
    ? (
      <View style={styles.inputImageContainer}>
        <View style={styles.cameraContainer}>
          <Image source={{ uri: image }} style={styles.fixedRatio} />
        </View>
        <Pressable
          title='UPLOAD'
          style={[styles.button, styles.buttonWhite]}
          onPress={() => {
            console.log('pressed upload')
            setUploading(true)
            handleUpload()
          }}
        >

          <Text style={[styles.buttonText, styles.textBlack, { textAlign: 'center' }]}>UPLOAD</Text>
        </Pressable>
        <Pressable
          title='CANCEL'
          style={[styles.button, styles.buttonGreyDark]}
          onPress={() => setImage(null)}
        >
          <Text style={[styles.buttonText, styles.textWhite, { textAlign: 'center' }]}>CANCEL</Text>
        </Pressable>
      </View>
      )
    : null

  const uploadingScreen = uploading
    ? (
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons name='blender' color={colors.yomWhite} size={50} />
        <Text style={[styles.bodyCopy, styles.textWhite]}>uploading...</Text>
      </View>
      )
    : null

  return (
    <View style={[styles.imagePageContainer, styles.buttonBlack]}>
      {cameraControls}
      {selectedImage}
      {uploadingScreen}
    </View>
  )
}
