import React from 'react'
import { Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CurrentPlanScreen from '../../plans/CurrentPlan/CurrentPlan.jsx'
import NextPlanScreen from '../../plans/NextPlan/NextPlan.jsx'

const Tab = createMaterialBottomTabNavigator()

export default function MealPlan () {
  return (
    <Tab.Navigator initialRouteName='Home' labeled={false}>
      <Tab.Screen
        name='Current Meal Plan' component={CurrentPlanScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home-variant' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Next Meal Plan' component={NextPlanScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home-variant' color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
