import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { AuthStackNavigator, SideMenuDrawerNavigator } from './navigation/AppNavigator/AppNavigator.jsx'

import { useFonts, JosefinSans_600SemiBold } from '@expo-google-fonts/josefin-sans'
import AppLoading from 'expo-app-loading'

import firebase from './db/firebase.js'

import pluralize from 'pluralize'
pluralize.addUncountableRule('large')
pluralize.addUncountableRule('small')

export default function App () {
  const [status, setStatus] = useState({ loggedIn: false, loaded: false })

  const [fontsLoaded] = useFonts({
    JosefinSans_600SemiBold
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setStatus({ ...status, loggedIn: false, loaded: true })
      } else {
        setStatus({ ...status, loggedIn: true, loaded: true })
      }
    })
  }, [])

  if (!status.loaded || !fontsLoaded) {
    return (
      <AppLoading />
    )
  }
  if (!status.loggedIn) {
    return (
      <AuthStackNavigator />
    )
  }
  return (
    <Provider store={store}>
      <SideMenuDrawerNavigator />
    </Provider>
  )
}
