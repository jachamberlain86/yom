import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function RecipeList () {
  const recipes = useSelector( state => state.recipes );

  const renderedRecipes = recipes.map( recipe => (
    <Text key={ recipe.title }>{ recipe.title }</Text>
  ) );

  return (
    <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
      <Text>Recipe List</Text>
      { renderedRecipes }
    </View>
  );
}