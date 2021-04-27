import React from 'react'
import { View, Pressable, Text } from 'react-native'

import firebase from 'firebase'

import { styles } from '../../styles/app.jsx'

export default function CustomDrawerButtons ({ navigation }) {
  return (
    <View>

      <Pressable
        onPress={() => {
          navigation.navigate('Main', { screen: 'Home Container', params: { screen: 'Home' } })
        }}
      >
        <Text style={[styles.bodyCopy, styles.textWhite, styles.drawerMenuItem]}>HOME</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Main', { screen: 'Add Recipe' })
        }}
      >
        <Text style={[styles.bodyCopy, styles.textWhite, styles.drawerMenuItem]}>ADD RECIPE</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Main', { screen: 'Account' })
        }}
      >
        <Text style={[styles.bodyCopy, styles.textWhite, styles.drawerMenuItem]}>ACCOUNT</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          firebase.auth().signOut().then(() => {
          // Sign-out successful.
          }).catch((err) => {
            console.log(err)
          })
        }}
      >
        <Text style={[styles.bodyCopy, styles.textWhite, styles.drawerMenuItem]}>LOG OUT</Text>
      </Pressable>
    </View>
  )
}
