import React from 'react'
import { Text, View } from 'react-native'
import pluralize from 'pluralize'
import prettyMilliseconds from 'pretty-ms'
import { useSelector } from 'react-redux'

export default function RecipeItem ({ route, navigation }) {
  const currentUser = useSelector(state => state.user.currentUser)
  const { recipe } = route.params

  const timeMilliseconds = recipe.timeMinutes * 60000
  const prettyTime = prettyMilliseconds(timeMilliseconds, { secondsDecimalDigits: 0, verbose: true })
  let renderRating = null
  if (recipe.rating) {
    renderRating = <Text>{recipe.rating}</Text>
  }

  const renderedIngredients = recipe.ingredients.map(ingredientObj => {
    const units = ['ml', 'l', 'g', 'kg', 'cm', 'mm', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'lb', 'oz', 'in']
    let modifiers = ''
    if (ingredientObj.modifiers.length) modifiers = ' (' + ingredientObj.modifiers.join(' ') + ')'
    if (!ingredientObj[currentUser.unitPref].unit) {
      const pluralIngredient = pluralize(ingredientObj.name, ingredientObj[currentUser.unitPref].amount)
      return (
        <Text key={ingredientObj.id}> - {ingredientObj[currentUser.unitPref].amount} {pluralIngredient}{modifiers}</Text>
      )
    } else if (!units.includes(ingredientObj[currentUser.unitPref].unit)) {
      const pluralUnit = pluralize(ingredientObj[currentUser.unitPref].unit, ingredientObj[currentUser.unitPref].amount, true)
      return (
        <Text key={ingredientObj.id}> - {pluralUnit} {ingredientObj.name}{modifiers}</Text>
      )
    } else {
      return (
        <Text key={ingredientObj.id}> - {ingredientObj[currentUser.unitPref].amount}{ingredientObj[currentUser.unitPref].unit} {ingredientObj.name}{modifiers}</Text>
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

  return (
    <View>
      <Text>{recipe.title}</Text>
      <Text>{recipe.servingSize.type} {recipe.servingSize.number}</Text>
      <Text>{prettyTime}</Text>
      {renderRating}
      {renderedIngredients}
      {renderedSteps}
      {renderNotes}
      <Text>Source: {recipe.source}</Text>

    </View>
  )
}
