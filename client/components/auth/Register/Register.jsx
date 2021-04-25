import React, { useState, setState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import firebase from 'firebase'
import { styles } from '../../../styles/app.jsx'

export default function Register () {
  const [user, setUser] = useState({ email: '', password: '', name: '' })
  const [confirm, setConfirm] = useState('')

  const match = user.password === confirm

  const canRegister = Boolean(user.email) && Boolean(user.password) && Boolean(user.name) && Boolean(confirm) && Boolean(match)

  async function onSignUp () {
    const { email, password, name } = user
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
      firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          name,
          email,
          unitPref: 'uk',
          themePref: 'auto',
          plans: {
          },
          lists: {
          }
        })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.authContainer}>
      <View style={styles.formFields}>
        <Text
          style={[styles.fieldHeader, styles.textWhite]}
        >
          first name
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='name'
          onChangeText={(name) => setUser({ ...user, name })}
        />
        <Text
          style={[styles.fieldHeader, styles.textWhite]}
        >
          username
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='email'
          keyboardType='email-address'
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
        <Text
          style={[styles.fieldHeader, styles.textWhite]}
        >
          confirm password
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='confirm password'
          secureTextEntry
          onChangeText={(text) => setConfirm(text)}
        />
      </View>
      <Pressable
        disabled={!canRegister}
        style={[styles.button, styles.buttonGreyDark]}
        onPress={() => onSignUp()}
      >
        <Text style={[styles.buttonText, styles.textWhite]}>SIGN UP</Text>
      </Pressable>
    </View>
  )
}
