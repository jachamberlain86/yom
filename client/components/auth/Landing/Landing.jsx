import React from 'react'
import { Text, View, Pressable } from 'react-native'
import { styles } from '../../../styles/app.jsx'

export default function Landing ({ navigation }) {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.logoLarge}>YOM</Text>
      <Pressable
        style={[styles.button, styles.buttonWhite]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[styles.buttonText, styles.textBlack]}>LOGIN</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonGreyDark]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={[styles.buttonText, styles.textWhite]}>REGISTER</Text>
      </Pressable>
    </View>
  )
}
