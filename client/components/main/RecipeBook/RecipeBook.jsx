import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RecipeListScreen from '../../recipes/RecipeList/RecipeList.jsx';
import AddRecipeScreen from '../../recipes/AddRecipe/AddRecipe.jsx';

const Tab = createMaterialBottomTabNavigator();

export default function RecipeBook () {
  return (
    <Tab.Navigator initialRouteName='Home' labeled={ false }>
      <Tab.Screen name='Recipe List' component={ RecipeListScreen }
        options={ {
          tabBarIcon: ( { color, size } ) => (
            <MaterialCommunityIcons name='home-variant' color={ color } size={ 26 } />
          )
        } }
      />
      <Tab.Screen name='Add Recipe' component={ AddRecipeScreen }
        options={ {
          tabBarIcon: ( { color, size } ) => (
            <MaterialCommunityIcons name='home-variant' color={ color } size={ 26 } />
          )
        } }
      />
    </Tab.Navigator>
  );
}
