import React from 'react'
import { Text, View } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles, colors } from '../../../styles/app.jsx'

export default function MealPlan () {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={[styles.heading, styles.textWhite]}>SHOPPING LISTS</Text>
      </View>

      <View style={styles.contentContainer}>
        <MaterialCommunityIcons name='text-box' color={colors.yomBlack} size={50} />
        <Text style={[styles.bodyCopy, styles.textBlack]}>coming soon...</Text>
      </View>
    </View>
  )
}
