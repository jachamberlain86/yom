import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard.jsx';

export default function RecipeList ( { navigation } ) {
  const recipes = useSelector( state => state.recipes );

  const renderedRecipes = recipes.map( recipe => (
    <RecipeCard key={ recipe.id } recipe={ recipe } navigation={ navigation } />
  ) );

  return (
    <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
      <Text>Recipe List</Text>
      { renderedRecipes }
    </View>
  );
}