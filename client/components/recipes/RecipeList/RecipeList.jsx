import React, { useEffect } from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRecipes } from '../../../features/Recipes/recipesSlice.js'
import { styles } from '../../../styles/app.jsx'

import RecipeCard from '../RecipeCard/RecipeCard.jsx'

export default function RecipeList ({ navigation }) {
  const dispatch = useDispatch()
  const recipesStatus = useSelector(state => state.recipes.status)
  const error = useSelector(state => state.recipes.error)
  const recipes = useSelector(state => state.recipes.recipes)

  useEffect(() => {
    if (recipesStatus === 'idle') {
      dispatch(fetchRecipes())
    }
  }, [recipesStatus, dispatch])

  let renderedRecipes

  if (recipesStatus === 'loading') {
    renderedRecipes = <Text>Loading...</Text>
  } else if (recipesStatus === 'succeeded') {
    renderedRecipes = recipes.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} navigation={navigation} />
    ))
  } else if (recipesStatus === 'failed') {
    renderedRecipes = <Text>{error}</Text>
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headingWhite}>RECIPE BOOK</Text>
      </View>
      <View style={styles.mainContainer}>
        <ScrollView>
          {renderedRecipes}
        </ScrollView>
      </View>
    </View>
  )
}
