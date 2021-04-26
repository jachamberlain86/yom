import React, { useState } from 'react'
import { View } from 'react-native'
import uuid from 'uuid'
import { nanoid } from '@reduxjs/toolkit'
import firebase from 'firebase'
require('firebase/firestore')
require('firebase/firebase-storage')

export async function uploadImage (uri) {
  const childPath = `post/${firebase.currentUser.uid}/${nanoid()}`
  const response = await window.fetch(uri)
  const blob = await response.blob()

  const task = firebase.storage().ref().child(childPath).put(blob)

  const taskProgress = snapshot => {
    console.log(`transferred: ${snapshot.bytesTransferred}`)
  }

  const taskError = snapshot => {
    console.log(snapshot)
  }

  const taskComplete = () => {
    task.snapshot.ref.getDownloadURL().then((snapshot) => {
      console.log(snapshot)
    })
  }

  task.on('state_changed', taskProgress, taskError, taskComplete)
}
