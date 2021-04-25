import React from 'react'
import { Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { tabBarStyle, colors, styles } from '../../../styles/app.jsx'

import RecipeListScreen from '../../recipes/RecipeList/RecipeList.jsx'
import AddRecipeScreen from '../../recipes/AddRecipe/AddRecipe.jsx'

const Tab = createMaterialBottomTabNavigator()
const EmptyScreen = () => {
  return (null)
}

export default function RecipeBook () {
  return (
    <View style={styles.screenContainer}>
      <Tab.Navigator
        initialRouteName='Home'
        labeled={false}
        activeColor={colors.yomWhite}
        inactiveColor={colors.yomWhite}
        barStyle={tabBarStyle}
      >
        <Tab.Screen
          name='Recipe List' component={RecipeListScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home-variant' color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name='Add Recipe Container' component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault()
              navigation.navigate('Add Recipe')
            }
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home-variant' color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}
