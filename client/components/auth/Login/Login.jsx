import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import firebase from 'firebase'
import { styles, colors } from '../../../styles/app.jsx'

export default function Login () {
  const [user, setUser] = useState({ email: '', password: '' })

  const canLogin = Boolean(user.email) && Boolean(user.password)

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
      <View style={styles.authContentContainer}>
        <View style={styles.formFields}>
          <Text
            style={[styles.bodyCopy, styles.textWhite]}
          >
            USERNAME:
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder='email'
            placeholderTextColor={colors.yomGreyLight}
            keyboardType='email-address'
            onChangeText={(email) => setUser({ ...user, email })}
          />

          <Text
            style={[styles.bodyCopy, styles.textWhite]}
          >
            PASSWORD:
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder='password'
            placeholderTextColor={colors.yomGreyLight}
            secureTextEntry
            onChangeText={(password) => setUser({ ...user, password })}
          />
        </View>
        <Pressable
          disabled={!canLogin}
          style={[styles.headerContainerInternal, styles.buttonWhite]}
          onPress={() => onSignIn()}
        >
          <Text style={[styles.headingInternal, styles.textBlack, { textAlign: 'center' }]}>SIGN IN</Text>
        </Pressable>
      </View>
    </View>
  )
}
