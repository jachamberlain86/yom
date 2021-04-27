import React from 'react'
import { Text, View, Pressable } from 'react-native'
import { styles } from '../../../styles/app.jsx'

export default function Landing ({ navigation }) {
  return (

    <View style={styles.authContainer}>
      <View style={styles.authContentContainer}>

        <Text style={styles.logoLarge}>YOM</Text>
        <Pressable
          style={[styles.headerContainerInternal, styles.buttonWhite]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.headingInternal, styles.textBlack, { textAlign: 'center' }]}>LOGIN</Text>
        </Pressable>
        <Pressable
          style={[styles.headerContainerInternal, styles.buttonGreyDark]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.headingInternal, styles.textWhite, { textAlign: 'center' }]}>REGISTER</Text>
        </Pressable>
      </View>
    </View>
  )
}
