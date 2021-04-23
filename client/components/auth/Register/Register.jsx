import React, { useState, setState } from 'react'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export default function Register () {
  const [user, setUser] = useState({ email: '', password: '', name: '' })

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
          recipes: [],
          plans: {
            current: [],
            next: []
          },
          lists: {
            current: [],
            previous: []
          }
        })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View>
      <TextInput
        placeholder='name'
        onChangeText={(name) => setUser({ ...user, name })}
      />
      <TextInput
        placeholder='email'
        onChangeText={(email) => setUser({ ...user, email })}
      />
      <TextInput
        placeholder='password'
        secureTextEntry
        onChangeText={(password) => setUser({ ...user, password })}
      />
      <Button
        onPress={() => onSignUp()}
        title='Sign up'
      />
    </View>
  )
}
