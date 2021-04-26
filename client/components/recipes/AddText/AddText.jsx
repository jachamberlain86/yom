import React, { useState } from 'react'
import { Text, View, TextInput, Button, Picker, Pressable, ScrollView } from 'react-native'
import pluralize from 'pluralize'
import { formatRecipeFromText } from '../../../controllers/recipe.js'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postRecipe } from '../../../features/Recipes/recipesSlice.js'
import { styles, colors } from '../../../styles/app.jsx'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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

  const canSave = Boolean(title) && Boolean(servingSize.number) && Boolean(timeMinutes) && Boolean(ingredients.length) && Boolean(steps.length)

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

  const renderedIngredients = ingredients.map(ingredientObj => <Text key={ingredientObj} style={[styles.bodyCopy, styles.textGreyDark]}>{'\u2022'} {ingredientObj}</Text>)

  const renderedSteps = steps.map(stepObj => {
    return (
      <View key={stepObj.number} style={styles.recipeSectionContainer}>
        <Text style={[styles.bodyCopy, styles.textGreyDark]}>STEP {stepObj.number}:</Text>
        <Text style={[styles.bodyCopy, styles.textGreyDark]}>{stepObj.instruction}</Text>
      </View>
    )
  })

  const renderedTags = tags.map(savedTag => {
    return (
      <View key={savedTag} style={[styles.buttonSmall, styles.buttonBlack]}>
        <Text>{savedTag}</Text>
      </View>
    )
  })

  let renderRating = null
  const ratingElementStar = <MaterialCommunityIcons name='star' color={colors.yomBlack} size={20} />
  const ratingElementStarOutline = <MaterialCommunityIcons name='star-outline' color={colors.yomBlack} size={20} />
  const ratingElementStarOutlinePale = <MaterialCommunityIcons name='star-outline' color={colors.yomGreyLight} size={20} />

  const ratingElementsArr = Array(5)
  if (rating) {
    ratingElementsArr.fill(ratingElementStarOutline)
    for (let i = 0; i < rating; i++) {
      ratingElementsArr[i] = ratingElementStar
    }
  } else {
    ratingElementsArr.fill(ratingElementStarOutlinePale)
  }

  renderRating = (
    <View style={styles.ratingContainer}>
      <Pressable
      onPress={() => setRating(1)}>

        {ratingElementsArr[0]}
      </Pressable>
      <Pressable

      onPress={() => setRating(2)}>

        {ratingElementsArr[1]}
      </Pressable>
      <Pressable

      onPress={() => setRating(3)}>

        {ratingElementsArr[2]}
      </Pressable>
      <Pressable

      onPress={() => setRating(4)}>

        {ratingElementsArr[3]}
      </Pressable>
      <Pressable

      onPress={() => setRating(5)}>

        {ratingElementsArr[4]}
      </Pressable>
    </View>
  )

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
      navigation.navigate('Recipe Book')
    } catch (err) {
      console.log(err)
    }
  }

  const ingredientForm = showIngredientForm
    ? (
      <View>
        <Text>INGREDIENT</Text>
        <TextInput
          placeholder='ingredient'
          onChangeText={(text) => setIngredient(text)}
        />
        <Pressable
        style={[styles.buttonSmall, styles.buttonBlack]}
          onPress={handleAddIngredient}
          disabled={!canAddIngredient}
        >
          <Text>ADD</Text>
        </Pressable>
      </View>
      )
    : null

  const stepForm = showStepForm
    ? (
      <View>
        <Text>INSTRUCTION</Text>
        <TextInput
          placeholder='instruction'
          onChangeText={(instruction) => setStep({ ...step, instruction })}
        />
        <Pressable
        style={[styles.buttonSmall, styles.buttonBlack]}
          onPress={handleAddStep}
          disabled={!canAddStep}
        >
          <Text>ADD</Text>
        </Pressable>
      </View>
      )
    : null

  const tagForm = showTagForm
    ? (
      <View>
        <Text>TAG:</Text>
        <TextInput
          placeholder='tag'
          onChangeText={(text) => setTag(text)}
        />
        <Pressable
        style={[styles.buttonSmall, styles.buttonBlack]}
          onPress={handleAddTag}
          disabled={!canAddTag}
        >
          <Text>ADD</Text>
        </Pressable>
      </View>
      )
    : null

  const ingredientBtn = showIngredientForm
    ? (
      <Pressable
      style={[styles.buttonSmall, styles.buttonDarkGrey]}
        onPress={() => {
          setShowIngredientForm(false)
          clearIngredientForm()
        }}
      >
        <Text>CANCEL</Text>
      </Pressable>
      )
    : (
      <Pressable
      style={[styles.buttonSmall, styles.buttonBlack]}
        onPress={() => setShowIngredientForm(true)}
      >
        <Text>ADD INGREDIENT</Text>
      </Pressable>
      )

  const stepBtn = showStepForm
    ? (
      <Pressable
      style={[styles.buttonSmall, styles.buttonGreyDark]}
        onPress={() => {
          setShowStepForm(false)
          clearStepForm()
        }}
      >
        <Text>CANCEL</Text>
      </Pressable>
      )
    : (
      <Pressable
      style={[styles.buttonSmall, styles.buttonBlack]}
        onPress={() => setShowStepForm(true)}
      >
        <Text>ADD STEP</Text>
      </Pressable>
      )

  const tagBtn = showTagForm
    ? (
      <Pressable
      style={[styles.buttonSmall, styles.buttonGreyDark]}
        onPress={() => {
          setShowTagForm(false)
          clearTagForm()
        }}
      >
        <Text>CANCEL</Text>
      </Pressable>
      )
    : (
      <Pressable
      style={[styles.buttonSmall, styles.buttonBlack]}
        onPress={() => setShowTagForm(true)}
      >
        <Text>ADD TAG</Text>
      </Pressable>
      )

  return (
    <View style={styles.mainContainer}>

      <View style={[styles.contentContainer, { alignItems: 'flex-start' }]}>
        <View style={styles.recipeSectionContainer}>

          <Text style={[styles.heading, styles.textBlack]}>Add Recipe</Text>
        </View>
        <Text style={[styles.bodyCopy, styles.textBlack]}>TITLE:</Text>
        <TextInput
          placeholder='Required'
          style={[styles.textInput, styles.textGreyDark]}
          onChangeText={(title) => setTitle(title)}
        />
        <Text style={[styles.bodyCopy, styles.textBlack]}>SERVING SIZE:</Text>
        <Picker
          selectedValue={servingSize.type}
          onValueChange={(itemValue, itemIndex) => setServingSize({ ...servingSize, type: itemValue })}
        >
          <Picker.Item label='SERVES' value='SERVES' />
          <Picker.Item label='MAKES' value='MAKES' />
        </Picker>
        <TextInput
          placeholder='Required'
          style={[styles.textInput, styles.textGreyDark]}
          keyboardType='numeric'
          onChangeText={(number) => setServingSize({ ...servingSize, number })}
        />
        <Text style={[styles.bodyCopy, styles.textBlack]}>MINS TO MAKE:</Text>
        <TextInput
          placeholder='Required'
          style={[styles.textInput, styles.textGreyDark]}
          keyboardType='numeric'
          onChangeText={(timeMinutes) => setTimeMinutes(timeMinutes)}
        />
        <View style={styles.recipeSectionContainer}>
          <Text style={[styles.bodyCopy, styles.textBlack]}>INGREDIENTS:</Text>
          {renderedIngredients}
          {ingredientForm}
          {ingredientBtn}
        </View>
        <View style={styles.recipeSectionContainer}>
          <Text style={[styles.bodyCopy, styles.textBlack]}>STEPS:</Text>
          {renderedSteps}
          {stepForm}
          {stepBtn}
        </View>
        <Text style={[styles.bodyCopy, styles.textBlack]}>NOTES:</Text>
        <TextInput
          style={[styles.textInput, styles.textGreyDark]}
          placeholder='Optional'
          onChangeText={(notes) => setNotes(notes)}
        />
        <Text style={[styles.bodyCopy, styles.textBlack]}>SOURCE:</Text>
        <TextInput
          placeholder='Optional'
          style={[styles.textInput, styles.textGreyDark]}
          onChangeText={(source) => setSource(source)}
        />
        <View style={styles.recipeSectionContainer}>
          <Text style={[styles.bodyCopy, styles.textBlack]}>TAGS:</Text>
          <View style={styles.recipeTagsContainer}>

            {renderedTags}
          </View>
          {tagForm}
          {tagBtn}
        </View>
        <View style={styles.recipeSectionContainer}>
          <Text style={[styles.bodyCopy, styles.textBlack]}>YOM RATING:</Text>
          {renderRating}
          <View style={styles.recipeTagsContainer} />
          {rating && <Pressable
            title='Remove Rating'
            style={[styles.buttonSmall, styles.buttonBlack]}
            onPress={() => setRating(null)}
                     >
            <Text style={[styles.bodyCopy, styles.textWhite]}>CLEAR RATING</Text>
                     </Pressable>}
        </View>
        <Pressable
          style={[styles.button, styles.buttonBlack]}
          onPress={() => handleSaveRecipe()}
          disabled={!canSave}
        >
          <Text style={[styles.buttonText, styles.textWhite]}>SAVE</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonGreyDark]}
          onPress={() => navigation.navigate('Recipe Book')}
        >
          <Text style={[styles.buttonText, styles.textWhite]}>CANCEL</Text>
        </Pressable>

      </View>
    </View>
  )
}
