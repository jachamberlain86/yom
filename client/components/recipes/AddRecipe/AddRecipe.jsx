import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import AddLinkScreen from '../AddLink/AddLink.jsx'
import AddImageScreen from '../AddImage/AddImage.jsx'
import AddTextScreen from '../AddText/AddText.jsx'

const Tab = createMaterialBottomTabNavigator()

export default function AddRecipe ({ navigation }) {
  return (
    <Tab.Navigator initialRouteName='Add Link' labeled={false}>
      <Tab.Screen
        name='Add Link'
        component={AddLinkScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home-variant' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Add Image'
        component={AddImageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home-variant' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Add Text'
        component={AddTextScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home-variant' color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>

  )
}
