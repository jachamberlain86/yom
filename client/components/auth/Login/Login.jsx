import React, { useState, setState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import { styles } from '../../../styles/app.jsx'

export default function Login () {
  const [user, setUser] = useState({ email: '', password: '' })

  async function onSignIn () {
    const { email, password } = user
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.authContainer}>
      <Text
        style={[styles.fieldHeader, styles.textWhite]}
      >
        username
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder='email'
        onChangeText={(email) => setUser({ ...user, email })}
      />
      <Text
        style={[styles.fieldHeader, styles.textWhite]}
      >
        password
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder='password'
        secureTextEntry
        onChangeText={(password) => setUser({ ...user, password })}
      />
      <TouchableOpacity
        style={[styles.button, styles.buttonWhite]}
        onPress={() => onSignIn()}
      >
        <Text style={[styles.buttonText, styles.textBlack]}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  )
}
