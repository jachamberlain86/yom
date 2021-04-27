import React, { useState } from 'react'
import { Text, View, Pressable, Image } from 'react-native'
import prettyMilliseconds from 'pretty-ms'
import { useSelector, useDispatch } from 'react-redux'
import { selectRecipeById, putRecipe, toggleInMenu } from '../../../features/Recipes/recipesSlice.js'
import { styles, colors } from '../../../styles/app.jsx'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function RecipeCard ({ navigation, recipeId }) {
  const recipe = useSelector(state => selectRecipeById(state, recipeId))
  const dispatch = useDispatch()

  const [cardDetails, setCardDetails] = useState(null)
  const [inMenu, setInMenu] = useState(recipe.inMenu)
  const [image, setImage] = useState(recipe.imageUrl)

  const timeMilliseconds = recipe.timeMinutes * 60000
  const prettyTime = prettyMilliseconds(timeMilliseconds, { secondsDecimalDigits: 0, verbose: true })

  let renderRating = null
  const ratingElementStar = <MaterialCommunityIcons name='star' color={colors.yomWhite} size={20} />
  const ratingElementStarOutline = <MaterialCommunityIcons name='star-outline' color={colors.yomWhite} size={20} />

  if (recipe.rating) {
    const ratingElementsArr = Array(5).fill(ratingElementStarOutline)
    for (let i = 0; i < recipe.rating; i++) {
      ratingElementsArr[i] = ratingElementStar
    }

    renderRating = (
      <View style={styles.ratingContainer}>
        {ratingElementsArr[0]}
        {ratingElementsArr[1]}
        {ratingElementsArr[2]}
        {ratingElementsArr[3]}
        {ratingElementsArr[4]}
      </View>
    )
  }

  function hideDetails () {
    setCardDetails(null)
  }

  function showDetails () {
    setCardDetails(
      <View style={styles.recipeCardDetailsContainer}>
        <View style={styles.recipeCardDetailsTextContainer}>

          <Text style={[styles.bodyCopy, styles.textWhite]}>{recipe.servingSize} servings</Text>
          <Text style={[styles.bodyCopy, styles.textWhite]}>{prettyTime}</Text>
          {renderRating}
        </View>
        <Pressable
          onPress={hideDetails}
        >
          <MaterialCommunityIcons name='close-thick' color={colors.yomWhite} size={20} />
        </Pressable>
      </View>
    )
  }

  function handleMenuBtn () {
    const updatedRecipe = { ...recipe }
    updatedRecipe.inMenu = !inMenu
  }

  const renderMenuBtn = inMenu
    ? (
      <Pressable
        onPress={() => {
          setInMenu(false)
          handleMenuBtn()
        }}
      >
        <Text>-</Text>
      </Pressable>
      )
    : (
      <Pressable
        title='+'
        onPress={() => {
          setInMenu(true)
          handleMenuBtn()
        }}
      >
        <Text>+</Text>
      </Pressable>
      )

  const renderedImage = image
    ? (
      <Image source={{ uri: image }} style={styles.recipeCardImage} />
      )
    : (
      <View style={styles.recipeCardIcon}>
        <MaterialCommunityIcons name='pot-mix' color={colors.yomBlack} size={24} />
      </View>
      )

  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate('Recipe Item', { recipeId: recipe.id })}
        onLongPress={showDetails}
      >
        <View style={styles.recipeCard}>
          {renderedImage}
          <View style={styles.recipeCardTextContainer}>
            <Text style={[styles.bodyCopy, styles.textBlack, { flexShrink: 1 }]} numberOfLines={2}>{recipe.title}</Text>
          </View>
        </View>
        {cardDetails}
      </Pressable>
      {/* <Pressable
        title='DELETE'
      >
        <View style={[styles.recipeCardIcon, styles.recipeCardIconRed]}>
          <MaterialCommunityIcons name='trash-can' color={colors.yomWhite} size={24} />
        </View>
      </Pressable> */}
    </View>
  )
}
