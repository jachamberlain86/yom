import React, { useState, setState } from 'react';
import { View, Button, TextInput } from 'react-native';
import firebase from 'firebase';

export default function Login () {
  const [ user, setUser ] = useState( { email: '', password: '' } );

  async function onSignIn () {
    const { email, password } = user;
    try {
      const result = await firebase.auth().signInWithEmailAndPassword( email, password );
    } catch ( err ) {
      console.log( err );
    }
  }

  return (
    <View>
      <TextInput
        placeholder='email'
        onChangeText={ ( email ) => setUser( { ...user, email } ) }
      />
      <TextInput
        placeholder='password'
        secureTextEntry={ true }
        onChangeText={ ( password ) => setUser( { ...user, password } ) }
      />
      <Button
        onPress={ () => onSignIn() }
        title='Sign in'
      />
    </View>
  );
}
