import React, { useState } from 'react'
import { Text, View, Pressable, Button, Image } from 'react-native'
import prettyMilliseconds from 'pretty-ms'
import { useSelector, useDispatch } from 'react-redux'
import { selectRecipeById, putRecipe, toggleInMenu } from '../../../features/Recipes/recipesSlice.js'
import { styles } from '../../../styles/app.jsx'

export default function RecipeCard ({ navigation, recipe }) {
  const [cardDetails, setCardDetails] = useState(null)
  const [inMenu, setInMenu] = useState(recipe.inMenu)
  const [image, setImage] = useState(recipe.imageUrl)
  const dispatch = useDispatch()

  console.log(image)
  const timeMilliseconds = recipe.timeMinutes * 60000
  const prettyTime = prettyMilliseconds(timeMilliseconds, { secondsDecimalDigits: 0, verbose: true })
  let renderRating = null
  if (recipe.rating) {
    renderRating = <Text>{recipe.rating}</Text>
  }

  function hideDetails () {
    setCardDetails(null)
  }

  function showDetails () {
    setCardDetails(
      <View>
        <Text>{recipe.servingSize.type} {recipe.servingSize.number}</Text>
        <Text>{prettyTime}</Text>
        <Text>{renderRating}</Text>
        <Button
          title='Close'
          onPress={hideDetails}
        />
      </View>
    )
  }

  function handleMenuBtn () {
    const updatedRecipe = { ...recipe }
    updatedRecipe.inMenu = !inMenu
  }

  const renderMenuBtn = inMenu
    ? (
      <Button
        title='-'
        onPress={() => {
          setInMenu(false)
          handleMenuBtn()
        }}
      />
      )
    : (
      <Button
        title='+'
        onPress={() => {
          setInMenu(true)
          handleMenuBtn()
        }}
      />
      )

  return (
    <View>
      {image && (<Image source={{ uri: image }} style={{ width: 70, height: 70 }} />)}
      <Pressable
        onPress={() => navigation.navigate('Recipe Item', { recipe })}
        onLongPress={showDetails}
      >
        <View>
          <Text>{recipe.title}</Text>
        </View>
      </Pressable>
      {renderMenuBtn}
      <Button
        title='DELETE'
      />
      {cardDetails}
    </View>
  )
}
