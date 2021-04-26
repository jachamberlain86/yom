import React from 'react'
import { Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { tabBarStyle, colors, styles } from '../../../styles/app.jsx'

import RecipeListScreen from '../../recipes/RecipeList/RecipeList.jsx'

const Tab = createMaterialBottomTabNavigator()
const EmptyScreen = () => {
  return (null)
}

export default function RecipeBook ({ navigation }) {
  return (
    <View style={styles.screenContainer}>

      <RecipeListScreen navigation={navigation} />

      <View>
        <Tab.Navigator
          labeled={false}
          activeColor={colors.yomWhite}
          inactiveColor={colors.yomWhite}
          barStyle={tabBarStyle}
        >
          <Tab.Screen
            name='Add Link Container'
            component={EmptyScreen}
            listeners={({ navigation }) => ({
              tabPress: event => {
                event.preventDefault()
                navigation.navigate('Add Link')
              }
            })}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='earth' color={color} size={26} />
              )
            }}
          />
          <Tab.Screen
            name='Add Image Container'
            component={EmptyScreen}
            listeners={({ navigation }) => ({
              tabPress: event => {
                event.preventDefault()
                navigation.navigate('Add Image')
              }
            })}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='camera' color={color} size={26} />
              )
            }}
          />
          <Tab.Screen
            name='Add Text Container'
            component={EmptyScreen}
            listeners={({ navigation }) => ({
              tabPress: event => {
                event.preventDefault()
                navigation.navigate('Add Text')
              }
            })}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='pencil' color={color} size={26} />
              )
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  )
}
