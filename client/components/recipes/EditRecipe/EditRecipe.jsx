import React, { useState } from 'react'
import { Text, View, TextInput, Button, Picker, ScrollView } from 'react-native'
import pluralize from 'pluralize'
import { formatRecipeFromText } from '../../../controllers/recipe.js'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postRecipe, putRecipe } from '../../../features/Recipes/recipesSlice.js'
import { styles } from '../../../styles/app.jsx'

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

  console.log(ingredients)

  const canSave = Boolean(title) && Boolean(servingSize.number) && Boolean(ingredients.length) && Boolean(steps.length)

  const [showIngredientForm, setShowIngredientForm] = useState(false)
  const [ingredient, setIngredient] = useState('')

  const canAddIngredient = Boolean(ingredient)

  const [showStepForm, setShowStepForm] = useState(false)
  const [step, setStep] = useState({
    number: steps.length
      ? steps[steps.length - 1].number + 1
      : 1,
    instruction: ''
  })

  const canAddStep = Boolean(step.instruction)

  const [showTagForm, setShowTagForm] = useState(false)
  const [tag, setTag] = useState('')

  const canAddTag = Boolean(tag)

  const renderedIngredients = ingredients.map(ingredientObj => {
    if (typeof ingredientObj === 'string') {
      return (
        <Text key={ingredientObj}> - {ingredientObj}</Text>
      )
    }
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
          postRecipe(formattedRecipe)
        )
      } else {
        dispatch(
          putRecipe(formattedRecipe)
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
    <View style={styles.container}>
      <ScrollView>
        <Text>Title</Text>
        <TextInput
          value={title}
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
          value={servingSize.number}
          keyboardType='numeric'
          onChangeText={(number) => setServingSize({ ...servingSize, number })}
        />
        <Text>Time</Text>
        <TextInput
          value={timeMinutes}
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
          value={notes}
          onChangeText={(notes) => setNotes(notes)}
        />
        <Text>Source</Text>
        <TextInput
          value={source}
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
    </View>
  )
}
