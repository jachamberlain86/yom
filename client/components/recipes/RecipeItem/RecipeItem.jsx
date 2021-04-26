import React, { useState } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import pluralize from 'pluralize'
import prettyMilliseconds from 'pretty-ms'
import { useSelector } from 'react-redux'
import { styles, colors } from '../../../styles/app.jsx'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { selectRecipeById } from '../../../features/Recipes/recipesSlice.js'

export default function RecipeItem ({ route, navigation }) {
  const { recipeId } = route.params
  const currentUser = useSelector(state => state.user.currentUser)
  const recipe = useSelector(state => selectRecipeById(state, recipeId))

  const [showMenu, setShowMenu] = useState(false)

  const timeMilliseconds = recipe.timeMinutes * 60000
  const prettyTime = prettyMilliseconds(timeMilliseconds, { secondsDecimalDigits: 0, verbose: true })

  let renderRating = null
  const ratingElementStar = <MaterialCommunityIcons name='star' color={colors.yomBlack} size={20} />
  const ratingElementStarOutline = <MaterialCommunityIcons name='star-outline' color={colors.yomBlack} size={20} />

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

  const renderedIngredients = recipe.ingredients.map(ingredientObj => {
    const units = ['ml', 'l', 'g', 'kg', 'cm', 'mm', 'fl oz', 'pt', 'qt', 'gal', 'lb', 'oz', 'in']
    let modifiers = ''
    if (ingredientObj.modifiers.length) modifiers = ' (' + ingredientObj.modifiers.join(', ') + ')'
    if (!ingredientObj[currentUser.unitPref].unit && !ingredientObj[currentUser.unitPref].amount) {
      const regEx = /^ERROR/
      return regEx.test(ingredientObj.name)
        ? (
          <View key={ingredientObj.name}>
            <Text style={{ color: 'red' }}>Oops! Something went wrong. Edit this ingredient and try again.</Text>
            <Text style={{ color: 'red' }}>- {ingredientObj.name}</Text>
          </View>
          )
        : (
          <Text key={ingredientObj.name}>- {ingredientObj.name}</Text>
          )
    } else if (!ingredientObj[currentUser.unitPref].unit) {
      const pluralIngredient = pluralize(ingredientObj.name, ingredientObj[currentUser.unitPref].amount)
      return (
        <Text key={ingredientObj.id}>- {ingredientObj[currentUser.unitPref].amount} {pluralIngredient}{modifiers}</Text>
      )
    } else if (!units.includes(ingredientObj[currentUser.unitPref].unit)) {
      const pluralUnit = pluralize(ingredientObj[currentUser.unitPref].unit, ingredientObj[currentUser.unitPref].amount, true)
      return (
        <Text key={ingredientObj.id}>- {pluralUnit} {ingredientObj.name}{modifiers}</Text>
      )
    } else {
      return (
        <Text key={ingredientObj.id}>- {ingredientObj[currentUser.unitPref].amount}{ingredientObj[currentUser.unitPref].unit} {ingredientObj.name}{modifiers}</Text>
      )
    }
  }
  )

  const renderedSteps = recipe.steps.map(step => (
    <View key={step.number}>
      <Text>Step {step.number}:</Text>
      <Text>{step.instruction}</Text>
    </View>
  ))

  let renderNotes = null
  if (recipe.notes) {
    renderNotes = (
      <View>
        <Text>Notes:</Text>
        <Text>{recipe.notes}</Text>
      </View>
    )
  }

  const menuBtn = showMenu
    ? (
      <Button
        title='CANCEL'
        onPress={() => {
          setShowMenu(false)
        }}
      />
      )
    : (
      <Button
        title='MENU'
        onPress={() => setShowMenu(true)}
      />
      )

  const menu = showMenu
    ? (
      <View>
        <Button
          title='EDIT'
        />
        <Button
          title='DELETE'
        />
        <Button
          title='ADD TO MENU'
        />
      </View>
      )
    : null

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>

        <ScrollView>
          <View style={styles.recipeTextContainer}>

            {/* {menuBtn}
          {menu} */}
            <Text style={[styles.heading, styles.textBlack]}>{recipe.title}</Text>
            <Text>{recipe.servingSize.type} {recipe.servingSize.number}</Text>
            <Text>{prettyTime}</Text>
            {renderRating}
            {renderedIngredients}
            {renderedSteps}
            {renderNotes}
            <Text>Source: {recipe.source}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
