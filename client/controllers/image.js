import React, { useState } from 'react'
import { View } from 'react-native'
import uuid from 'uuid'
import { nanoid } from '@reduxjs/toolkit'
import firebase from 'firebase'
require('firebase/firestore')
require('firebase/firebase-storage')

export async function uploadImage (uri) {
  const childPath = `post/${firebase.auth().currentUser.uid}/${nanoid()}`
  console.log(childPath)
  const response = await window.fetch(uri)
  const blob = await response.blob()

  const task = firebase.storage().ref().child(childPath).put(blob)

  const taskProgress = snapshot => {
    console.log(`transferred: ${snapshot.bytesTransferred}`)
  }

  const taskError = snapshot => {
    console.log('error ', snapshot)
  }

  const taskComplete = () => {
    task.snapshot.ref.getDownloadURL().then((snapshot) => { console.log('snapshot ', snapshot) })
  }

  task.on('state_changed', taskProgress, taskError, taskComplete)
}

export async function submitToGoogle (image) {
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
    return parsedResponse
  } catch (error) {
    console.log(error)
  }
}
