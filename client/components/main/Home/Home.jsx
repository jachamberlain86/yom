import React, { useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../../features/User/userSlice.js'
import { fetchRecipes } from '../../../features/Recipes/recipesSlice.js'
import { styles, colors } from '../../../styles/app.jsx'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'

import RecipeCard from '../../recipes/RecipeCard/RecipeCard.jsx'

export default function Home ({ navigation }) {
  const dispatch = useDispatch()
  const userStatus = useSelector(state => state.user.status)
  const userError = useSelector(state => state.user.error)
  const recipesStatus = useSelector(state => state.recipes.status)
  const recipesError = useSelector(state => state.recipes.error)
  const recipes = useSelector(state => state.recipes.recipes)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser())
    }
    if (recipesStatus === 'idle') {
      dispatch(fetchRecipes())
    }
  }, [userStatus, recipesStatus, dispatch])

  const renderRecipes = recipes.length
    ? (
        recipes.slice(0, 3).map(recipe => (
          <RecipeCard key={recipe.id} recipeId={recipe.id} navigation={navigation} />
        ))
      )
    : (
      <Pressable
        style={[styles.headerContainerInternal, styles.buttonGreyLight]}
        onPress={() => navigation.navigate('Add Recipe')}
      >
        <Text style={[styles.headingInternal, styles.textBlack]}>ADD A RECIPE</Text>
      </Pressable>
      )

  let homeContent

  if (userStatus === 'loading' || recipesStatus === 'loading') {
    homeContent = (
      <View>
        <MaterialCommunityIcons name='pot-mix' color={colors.yomBlack} size={50} />
        <Text style={[styles.bodyCopy, styles.textBlack]}>loading...</Text>
      </View>
    )
  } else if (userStatus === 'succeeded' && recipesStatus === 'succeeded') {
    homeContent = (

      <View style={styles.scrollableItem}>

        <Pressable
          style={[styles.headerContainerInternal]}
          onPress={() => navigation.navigate('Meal Plan')}
        >
          <Text style={[styles.headingInternal, styles.textWhite]}>ON THE MENU</Text>
        </Pressable>
        <Pressable
          style={[styles.headerContainerInternal, styles.buttonGreyLight]}
          onPress={() => navigation.navigate('Meal Plan')}
        >
          <Text style={[styles.headingInternal, styles.textBlack]}>NEW MEAL PLAN</Text>
        </Pressable>
        <Pressable
          style={[styles.headerContainerInternal]}
          onPress={() => navigation.navigate('Recipe Book')}
        >
          <Text style={[styles.headingInternal, styles.textWhite]}>RECIPE BOOK</Text>
        </Pressable>
        {renderRecipes}
        <Pressable
          style={[styles.headerContainerInternal]}
        >
          <Text style={[styles.headingInternal, styles.textWhite]} onPress={() => navigation.navigate('Shopping List')}>SHOPPING LIST</Text>
        </Pressable>
        <View style={{ marginBottom: 70 }} />

      </View>
    )
  } else if (userStatus === 'failed') {
    homeContent = <Text style={[styles.bodyCopy, styles.textBlack]}>{userError}</Text>
  } else if (recipesStatus === 'failed') {
    homeContent = <Text style={[styles.bodyCopy, styles.textBlack]}>{recipesError}</Text>
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        {homeContent}
      </View>
    </View>
  )
}
