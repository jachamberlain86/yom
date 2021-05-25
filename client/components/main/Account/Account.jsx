import React from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { styles } from '../../../styles/app.jsx'
import { useSelector } from 'react-redux'

export default function Account ({ navigation }) {
  const currentUser = useSelector(state => state.user.currentUser)

  return (
    <View style={[styles.mainContainer]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.heading, styles.textWhite]}>ACCOUNT</Text>
      </View>
      <View style={[styles.contentContainer]}>
        <ScrollView style={styles.scrollableItem}>
          <View style={{ marginBottom: 20 }}>
            <Pressable style={[styles.headerContainerInternal]}>
              <Text style={[styles.headingInternal, styles.textWhite]}>DETAILS</Text>
            </Pressable>
            <View style={{ padding: 5 }}>

              <Text style={[styles.bodyCopy, styles.textBlack]}>NAME:</Text>
              <Text style={[styles.bodyCopy, styles.textBlack]}>{currentUser.name}</Text>
              <Text style={[styles.bodyCopy, styles.textBlack]}>USERNAME:</Text>
              <Text style={[styles.bodyCopy, styles.textBlack]}>{currentUser.email}</Text>
            </View>
          </View>
          <View>
            <Pressable style={[styles.headerContainerInternal]}>
              <Text style={[styles.headingInternal, styles.textWhite]}>SETTINGS</Text>
            </Pressable>
            <View style={{ padding: 5 }}>

              <Text style={[styles.bodyCopy, styles.textBlack, { textTransform: 'uppercase' }]}>UNITS:  {currentUser.unitPref}</Text>
              <Text style={[styles.bodyCopy, styles.textBlack, { textTransform: 'uppercase' }]}>THEME:  {currentUser.themePref}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
