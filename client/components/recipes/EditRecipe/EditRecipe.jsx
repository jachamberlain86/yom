import React, { useState } from 'react'
import { Text, View, TextInput, Button, Picker, ScrollView } from 'react-native'
import pluralize from 'pluralize'
import { formatRecipeFromText } from '../../../controllers/recipe.js'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { recipeAdded } from '../../../features/Recipes/recipesSlice.js'

export default function EditRecipe ({ route, navigation }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const { recipe } = route.params

  const [title, setTitle] = useState(recipe.title)
  const [servingSize, setServingSize] = useState({ ...recipe.servingSize })
  const [timeMinutes, setTimeMinutes] = useState(recipe.timeMinutes)
  const [ingredients, setIngredients] = useState([...recipe.ingredients])
  const [steps, setSteps] = useState([...recipe.steps])
  const [notes, setNotes] = useState(recipe.notes)
  const [source, setSource] = useState(recipe.source)
  const [tags, setTags] = useState([...recipe.tags])
  const [rating, setRating] = useState(recipe.rating)

  const [showIngredientForm, setShowIngredientForm] = useState(false)
  const [ingredient, setIngredient] = useState('')

  const [showStepForm, setShowStepForm] = useState(false)
  const [step, setStep] = useState({
    number: steps.length
      ? steps[steps.length - 1].number + 1
      : 1,
    instruction: ''
  })

  const [showTagForm, setShowTagForm] = useState(false)
  const [tag, setTag] = useState('')

  const renderedIngredients = ingredients.map(ingredientObj => {
    const units = ['ml', 'l', 'g', 'kg', 'cm', 'mm', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'lb', 'oz', 'in']
    if (!ingredientObj[currentUser.unitPref].unit) {
      const pluralIngredient = pluralize(ingredientObj.name, ingredientObj[currentUser.unitPref].amount)
      return (
        <Text key={ingredientObj.id}> - {ingredientObj[currentUser.unitPref].amount} {ingredientObj.modifiers.join(' ')} {pluralIngredient}</Text>
      )
    } else if (!units.includes(ingredientObj[currentUser.unitPref].unit)) {
      const pluralUnit = pluralize(ingredientObj[currentUser.unitPref].unit, ingredientObj[currentUser.unitPref].amount, true)
      return (
        <Text key={ingredientObj.id}> - {pluralUnit} {ingredientObj.modifiers.join(' ')} {ingredientObj.name}</Text>
      )
    } else {
      return (
        <Text key={ingredientObj.id}> - {ingredientObj[currentUser.unitPref].amount}{ingredientObj[currentUser.unitPref].unit} {ingredientObj.modifiers.join(' ')} {ingredientObj.name}</Text>
      )
    }
  }
  )

  const renderedSteps = steps.map(stepObj => {
    return (
      <View key={stepObj.number}>
        <Text>STEP {stepObj.number}:</Text>
        <Text>{stepObj.instruction}</Text>
      </View>
    )
  })

  const renderedTags = tags.map(savedTag => {
    return (
      <View key={savedTag}>
        <Text>{savedTag}</Text>
      </View>
    )
  })

  function clearIngredientForm () {
    setIngredient('')
  }

  function handleAddIngredient () {
    setIngredients([...ingredients, ingredient])
    setShowIngredientForm(false)
    clearIngredientForm()
  }

  function clearStepForm () {
    setStep({
      ...step,
      instruction: ''
    })
  }

  function handleAddStep () {
    setSteps([...steps, { ...step }])
    setShowStepForm(false)
    clearStepForm()
    setStep({ ...step, number: step.number + 1 })
  }

  function clearTagForm () {
    setTag('')
  }

  function handleAddTag () {
    setTags([...tags, tag])
    setShowTagForm(false)
    clearTagForm()
  }

  async function handleSaveRecipe () {
    const editedRecipe = {
      ...recipe,
      title,
      servingSize,
      timeMinutes,
      ingredients,
      steps,
      notes,
      source,
      tags,
      rating
    }
    try {
      const formattedRecipe = await formatRecipeFromText(editedRecipe)
      if (!formattedRecipe.id) {
        formattedRecipe.id = nanoid()
        dispatch(
          recipeAdded(formattedRecipe)
        )
      }
      navigation.navigate('Recipe List')
    } catch (err) {
      console.log(err)
    }
  }

  const ingredientForm = showIngredientForm
    ? (
      <View>
        <Text>Ingredient</Text>
        <TextInput
          placeholder='ingredient'
          onChangeText={(text) => setIngredient(text)}
        />
        <Button
          title='Add'
          onPress={handleAddIngredient}
        />
      </View>
      )
    : null

  const stepForm = showStepForm
    ? (
      <View>
        <Text>Instruction</Text>
        <TextInput
          placeholder='instruction'
          onChangeText={(instruction) => setStep({ ...step, instruction })}
        />
        <Button
          title='ADD'
          onPress={handleAddStep}
        />
      </View>
      )
    : null

  const tagForm = showTagForm
    ? (
      <View>
        <Text>Tag</Text>
        <TextInput
          placeholder='tag'
          onChangeText={(text) => setTag(text)}
        />
        <Button
          title='ADD'
          onPress={handleAddTag}
        />
      </View>
      )
    : null

  const ingredientBtn = showIngredientForm
    ? (
      <Button
        title='CANCEL'
        onPress={() => {
          setShowIngredientForm(false)
          clearIngredientForm()
        }}
      />
      )
    : (
      <Button
        title='EDIT INGREDIENTS'
        onPress={() => setShowIngredientForm(true)}
      />
      )

  const stepBtn = showStepForm
    ? (
      <Button
        title='CANCEL'
        onPress={() => {
          setShowStepForm(false)
          clearStepForm()
        }}
      />
      )
    : (
      <Button
        title='EDIT STEPS'
        onPress={() => setShowStepForm(true)}
      />
      )

  const tagBtn = showTagForm
    ? (
      <Button
        title='CANCEL'
        onPress={() => {
          setShowTagForm(false)
          clearTagForm()
        }}
      />
      )
    : (
      <Button
        title='EDIT TAGS'
        onPress={() => setShowTagForm(true)}
      />
      )

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>Title</Text>
      <TextInput
        placeholder={title}
        onChangeText={(title) => setTitle(title)}
      />
      <Text>Serving size</Text>
      <Picker
        selectedValue={servingSize.type}
        onValueChange={(itemValue, itemIndex) => setServingSize({ ...servingSize, type: itemValue })}
      >
        <Picker.Item label='SERVES' value='SERVES' />
        <Picker.Item label='MAKES' value='MAKES' />
      </Picker>
      <TextInput
        placeholder={servingSize.number}
        keyboardType='numeric'
        onChangeText={(number) => setServingSize({ ...servingSize, number })}
      />
      <Text>Time</Text>
      <TextInput
        placeholder={timeMinutes}
        keyboardType='numeric'
        onChangeText={(timeMinutes) => setTimeMinutes(timeMinutes)}
      />
      <View>
        <Text>Ingredients</Text>
        {renderedIngredients}
        {ingredientForm}
        {ingredientBtn}
      </View>
      <View>
        <Text>Steps</Text>
        {renderedSteps}
        {stepForm}
        {stepBtn}
      </View>
      <Text>Notes</Text>
      <TextInput
        placeholder={notes}
        onChangeText={(notes) => setNotes(notes)}
      />
      <Text>Source</Text>
      <TextInput
        placeholder={source}
        onChangeText={(source) => setSource(source)}
      />
      <View>
        <Text>Tags</Text>
        {renderedTags}
        {tagForm}
        {tagBtn}
      </View>
      <View>
        <Text>YOM Rating</Text>
        <Text>{rating ? pluralize('YOM', rating, true) : 'Rate this recipe!'}</Text>
        <Button title='1' onPress={() => setRating(1)} />
        <Button title='2' onPress={() => setRating(2)} />
        <Button title='3' onPress={() => setRating(3)} />
        <Button title='4' onPress={() => setRating(4)} />
        <Button title='5' onPress={() => setRating(5)} />
        <Button title='Remove Rating' onPress={() => setRating(null)} />
      </View>
      <Button title='SAVE' onPress={() => handleSaveRecipe()} />
      <Button title='CANCEL' onPress={() => navigation.navigate('Recipe List')} />

    </ScrollView>
  )
}
