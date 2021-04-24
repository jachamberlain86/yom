import React, { useState } from 'react'
import { Text, View, TextInput, Button, Picker, ScrollView } from 'react-native'
import pluralize from 'pluralize'
import { formatRecipeFromText } from '../../../controllers/recipe.js'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postRecipe } from '../../../features/Recipes/recipesSlice.js'

export default function AddText ({ navigation }) {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [servingSize, setServingSize] = useState({ number: null, type: 'SERVES' })
  const [timeMinutes, setTimeMinutes] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])
  const [notes, setNotes] = useState('')
  const [source, setSource] = useState('')
  const [tags, setTags] = useState([])
  const [rating, setRating] = useState(null)

  const canSave = Boolean(title) && Boolean(servingSize.number) && Boolean(ingredients.length) && Boolean(steps.length)

  const [showIngredientForm, setShowIngredientForm] = useState(false)
  const [ingredient, setIngredient] = useState('')

  const canAddIngredient = Boolean(ingredient)

  const [showStepForm, setShowStepForm] = useState(false)
  const [step, setStep] = useState({
    number: 1,
    instruction: ''
  })

  const canAddStep = Boolean(step.instruction)

  const [showTagForm, setShowTagForm] = useState(false)
  const [tag, setTag] = useState('')

  const canAddTag = Boolean(tag)

  const renderedIngredients = ingredients.map(ingredientObj => <Text key={ingredientObj}> - {ingredientObj}</Text>)

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

  function clearRecipeForm () {
    clearIngredientForm()
    clearStepForm()
    clearTagForm()
    setTitle('')
    setServingSize({ number: 0, type: 'SERVES' })
    setTimeMinutes(0)
    setIngredients([])
    setSteps([])
    setNotes('')
    setSource('')
    setTags([])
    setRating(null)
  }

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
    const recipe = {
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
      const formattedRecipe = await formatRecipeFromText(recipe)
      formattedRecipe.id = nanoid()
      await dispatch(
        postRecipe(formattedRecipe)
      )
      clearRecipeForm()
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
          disabled={!canAddIngredient}
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
          disabled={!canAddStep}
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
          disabled={!canAddTag}
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
        title='ADD INGREDIENT'
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
        title='ADD STEP'
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
        title='ADD TAG'
        onPress={() => setShowTagForm(true)}
      />
      )

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>Add Recipe</Text>
      <Text>Title</Text>
      <TextInput
        placeholder='title'
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
        placeholder='serving number'
        keyboardType='numeric'
        onChangeText={(number) => setServingSize({ ...servingSize, number })}
      />
      <Text>Time</Text>
      <TextInput
        placeholder='time to prepare'
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
        placeholder='additional notes'
        onChangeText={(notes) => setNotes(notes)}
      />
      <Text>Source</Text>
      <TextInput
        placeholder='source'
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
      <Button title='SAVE' onPress={() => handleSaveRecipe()} disabled={!canSave} />
      <Button title='CANCEL' onPress={() => navigation.navigate('Recipe List')} />

    </ScrollView>
  )
}
