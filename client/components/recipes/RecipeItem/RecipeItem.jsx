import React, { useState } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import pluralize from 'pluralize'
import prettyMilliseconds from 'pretty-ms'
import { useSelector } from 'react-redux'
import { styles } from '../../../styles/app.jsx'

export default function RecipeItem ({ route, navigation }) {
  const currentUser = useSelector(state => state.user.currentUser)
  const { recipe } = route.params

  const [showMenu, setShowMenu] = useState(false)

  const timeMilliseconds = recipe.timeMinutes * 60000
  const prettyTime = prettyMilliseconds(timeMilliseconds, { secondsDecimalDigits: 0, verbose: true })
  let renderRating = null
  if (recipe.rating) {
    renderRating = <Text>{recipe.rating ? pluralize('YOM', recipe.rating, true) : 'Rate this recipe!'}</Text>
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
    <View style={styles.container}>
      <ScrollView>

        {menuBtn}
        {menu}
        <Text>{recipe.title}</Text>
        <Text>{recipe.servingSize.type} {recipe.servingSize.number}</Text>
        <Text>{prettyTime}</Text>
        {renderRating}
        {renderedIngredients}
        {renderedSteps}
        {renderNotes}
        <Text>Source: {recipe.source}</Text>
      </ScrollView>
    </View>
  )
}
