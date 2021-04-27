import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import firebase from 'firebase'
import { styles, colors } from '../../../styles/app.jsx'

export default function Register () {
  const [user, setUser] = useState({ email: '', password: '', name: '' })
  const [confirm, setConfirm] = useState('')

  const match = user.password === confirm

  const canRegister = Boolean(user.email) && Boolean(user.password) && Boolean(user.name) && Boolean(confirm) && Boolean(match)

  async function onSignUp () {
    const { email, password, name } = user
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          name,
          email,
          unitPref: 'uk',
          themePref: 'auto'
        })
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
            FIRST NAME:
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder='name'
            placeholderTextColor={colors.yomGreyLight}
            onChangeText={(name) => setUser({ ...user, name })}
          />
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
          <Text
            style={[styles.bodyCopy, styles.textWhite]}
          >
            CONFIRM PASSWORD:
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
          style={[styles.headerContainerInternal, styles.buttonGreyDark]}
          onPress={() => onSignUp()}
        >
          <Text style={[styles.headingInternal, styles.textWhite, { textAlign: 'center' }]}>SIGN UP</Text>
        </Pressable>
      </View>
    </View>
  )
}
