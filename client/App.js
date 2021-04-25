import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './app/store.js'
import EditRecipeScreen from './components/recipes/EditRecipe/EditRecipe.jsx'
import { styles } from './styles/app.jsx'
import { useFonts, JosefinSans_600SemiBold } from '@expo-google-fonts/josefin-sans'
import AppLoading from 'expo-app-loading'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import firebase from 'firebase'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import pluralize from 'pluralize'

import LandingScreen from './components/auth/Landing/Landing.jsx'
import LoginScreen from './components/auth/Login/Login.jsx'
import RegisterScreen from './components/auth/Register/Register.jsx'
import DashboardScreen from './components/main/Dashboard/Dashboard.jsx'
import RecipeBookScreen from './components/main/RecipeBook/RecipeBook.jsx'
import MealPlanScreen from './components/main/MealPlan/MealPlan.jsx'
import AddRecipeScreen from './components/recipes/AddRecipe/AddRecipe.jsx'
import RecipeItemScreen from './components/recipes/RecipeItem/RecipeItem.jsx'
import UploadImageScreen from './components/recipes/UploadImage/UploadImage.jsx'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

pluralize.addUncountableRule('large')
pluralize.addUncountableRule('small')

const Stack = createStackNavigator()

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
      <SafeAreaView style={styles.safeArea}>

        <AppLoading />
      </SafeAreaView>
    )
  }
  if (!status.loggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Landing'
          >
            <Stack.Screen name='Landing' component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  }
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>

        <NavigationContainer>
          <Stack.Navigator initialRouteName='Dashboard'>
            <Stack.Screen name='Dashboard' component={DashboardScreen} />
            <Stack.Screen name='Recipe Book' component={RecipeBookScreen} />
            <Stack.Screen name='Meal Plan' component={MealPlanScreen} />
            <Stack.Screen name='Add Recipe' component={AddRecipeScreen} />
            <Stack.Screen name='Recipe Item' component={RecipeItemScreen} />
            <Stack.Screen name='Edit Recipe' component={EditRecipeScreen} />
            <Stack.Screen name='Upload Image' component={UploadImageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  )
}
