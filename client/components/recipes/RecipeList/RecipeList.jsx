import React from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import { styles } from '../../../styles/app.jsx'

import RecipeCard from '../RecipeCard/RecipeCard.jsx'

export default function RecipeList ({ navigation }) {
  const recipes = useSelector(state => state.recipes.recipes)

  const renderedRecipes = recipes.map(recipe => (
    <RecipeCard key={recipe.id} recipeId={recipe.id} navigation={navigation} />
  ))

  return (

    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={[styles.heading, styles.textWhite]}>RECIPE BOOK</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={{ flex: 1 }} />
        <ScrollView>
          {renderedRecipes}
        </ScrollView>
      </View>
    </View>
  )
}
