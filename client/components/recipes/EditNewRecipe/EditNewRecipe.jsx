import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, Picker } from 'react-native'
import pluralize from 'pluralize'
import { formatRecipeFromText } from '../../../controllers/recipe.js'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postRecipe, putRecipe } from '../../../features/Recipes/recipesSlice.js'
import { styles, colors } from '../../../styles/app.jsx'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function EditNewRecipe ({ route, navigation }) {
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

  const canSave = Boolean(title) && Boolean(servingSize.number) && Boolean(timeMinutes) && Boolean(ingredients.length) && Boolean(steps.length)

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

  const renderIngredientsWarning = ingredients.length
    ? (
        null
      )
    : (
      <Text style={[styles.bodyCopy, styles.textGreyDark]}>add at least 1 ingredient</Text>
      )
  const renderStepsWarning = steps.length
    ? (
        null
      )
    : (
      <Text style={[styles.bodyCopy, styles.textGreyDark]}>add at least 1 step</Text>
      )

  const renderedIngredients = ingredients.map(ingredientObj => {
    if (typeof ingredientObj === 'string') {
      return (
        <Text key={ingredientObj} style={[styles.bodyCopy, styles.textGreyDark]}>{'\u2022'} {ingredientObj}</Text>
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
            <Text style={[styles.bodyCopy, styles.textRed]}>Oops! Something went wrong. Edit this ingredient and try again.</Text>
            <Text style={[styles.bodyCopy, styles.textRed]}>{'\u2022'} {ingredientObj.name}</Text>
          </View>
          )
        : (
          <Text key={ingredientObj.name} style={[styles.bodyCopy, styles.textGreyDark]}>{'\u2022'} {ingredientObj.name}</Text>
          )
    } else if (!ingredientObj[currentUser.unitPref].unit) {
      const pluralIngredient = pluralize(ingredientObj.name, ingredientObj[currentUser.unitPref].amount)
      return (
        <Text key={ingredientObj.id} style={[styles.bodyCopy, styles.textGreyDark]}>{'\u2022'} {ingredientObj[currentUser.unitPref].amount} {pluralIngredient}{modifiers}</Text>
      )
    } else if (!units.includes(ingredientObj[currentUser.unitPref].unit)) {
      const pluralUnit = pluralize(ingredientObj[currentUser.unitPref].unit, ingredientObj[currentUser.unitPref].amount, true)
      return (
        <Text key={ingredientObj.id} style={[styles.bodyCopy, styles.textGreyDark]}>{'\u2022'} {pluralUnit} {ingredientObj.name}{modifiers}</Text>
      )
    } else {
      return (
        <Text key={ingredientObj.id} style={[styles.bodyCopy, styles.textGreyDark]}>{'\u2022'} {ingredientObj[currentUser.unitPref].amount}{ingredientObj[currentUser.unitPref].unit} {ingredientObj.name}{modifiers}</Text>
      )
    }
  }
  )

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
      <View key={savedTag} style={[styles.tag]}>
        <Text style={[styles.bodyCopy, styles.textWhite]}>{'\u2022'} {savedTag}</Text>
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
    <View style={[styles.ratingContainer, styles.recipeFieldHeader]}>
      <Pressable
        onPress={() => setRating(1)}
      >
        {ratingElementsArr[0]}
      </Pressable>
      <Pressable
        onPress={() => setRating(2)}
      >
        {ratingElementsArr[1]}
      </Pressable>
      <Pressable
        onPress={() => setRating(3)}
      >
        {ratingElementsArr[2]}
      </Pressable>
      <Pressable
        onPress={() => setRating(4)}
      >
        {ratingElementsArr[3]}
      </Pressable>
      <Pressable
        onPress={() => setRating(5)}
      >
        {ratingElementsArr[4]}
      </Pressable>
    </View>
  )

  const renderClearRating = rating
    ? (
      <Pressable
        title='Remove Rating'
        style={[styles.buttonSmall, styles.buttonBlack]}
        onPress={() => setRating(null)}
      >
        <Text style={[styles.bodyCopy, styles.textWhite]}>CLEAR RATING</Text>
      </Pressable>
      )
    : null

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
      navigation.navigate('Recipe Book')
    } catch (err) {
      console.log(err)
    }
  }

  const ingredientForm = showIngredientForm
    ? (
      <View>
        <Text style={[styles.bodyCopy, styles.textBlack, styles.recipeFieldHeader]}>INGREDIENT:</Text>
        <TextInput
          placeholder='Required'
          style={[styles.textInput, styles.textGreyDark]}
          onChangeText={(text) => setIngredient(text)}
        />
        <Pressable
          style={[styles.buttonSmall, styles.buttonBlack]}
          onPress={handleAddIngredient}
          disabled={!canAddIngredient}
        >
          <Text style={[styles.bodyCopy, styles.textWhite]}>ADD</Text>
        </Pressable>
      </View>
      )
    : null

  const stepForm = showStepForm
    ? (
      <View>
        <Text style={[styles.bodyCopy, styles.textBlack, styles.recipeFieldHeader]}>INSTRUCTION:</Text>
        <TextInput
          placeholder='Required'
          style={[styles.textInput, styles.textGreyDark]}
          onChangeText={(instruction) => setStep({ ...step, instruction })}
        />
        <Pressable
          style={[styles.buttonSmall, styles.buttonBlack]}
          onPress={handleAddStep}
          disabled={!canAddStep}
        >
          <Text style={[styles.bodyCopy, styles.textWhite]}>ADD</Text>
        </Pressable>
      </View>
      )
    : null

  const tagForm = showTagForm
    ? (
      <View>
        <Text style={[styles.bodyCopy, styles.textBlack, styles.recipeFieldHeader]}>TAG:</Text>
        <TextInput
          placeholder='Optional'
          style={[styles.textInput, styles.textGreyDark]}
          onChangeText={(text) => setTag(text)}
        />
        <Pressable
          style={[styles.buttonSmall, styles.buttonBlack]}
          onPress={handleAddTag}
          disabled={!canAddTag}
        >
          <Text style={[styles.bodyCopy, styles.textWhite]}>ADD</Text>
        </Pressable>
      </View>
      )
    : null

  const ingredientBtn = showIngredientForm
    ? (
      <Pressable
        style={[styles.buttonSmall, styles.buttonGreyDark]}
        onPress={() => {
          setShowIngredientForm(false)
          clearIngredientForm()
        }}
      >
        <Text style={[styles.bodyCopy, styles.textWhite]}>CANCEL</Text>
      </Pressable>
      )
    : (
      <Pressable
        style={[styles.buttonSmall, styles.buttonBlack]}
        onPress={() => setShowIngredientForm(true)}
      >
        <Text style={[styles.bodyCopy, styles.textWhite]}>ADD INGREDIENT</Text>
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
        <Text style={[styles.bodyCopy, styles.textWhite]}>CANCEL</Text>
      </Pressable>
      )
    : (
      <Pressable
        style={[styles.buttonSmall, styles.buttonBlack]}
        onPress={() => setShowStepForm(true)}
      >
        <Text style={[styles.bodyCopy, styles.textWhite]}>ADD STEP</Text>
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
        <Text style={[styles.bodyCopy, styles.textWhite]}>CANCEL</Text>
      </Pressable>
      )
    : (
      <Pressable
        style={[styles.buttonSmall, styles.buttonBlack]}
        onPress={() => setShowTagForm(true)}
      >
        <Text style={[styles.bodyCopy, styles.textWhite]}>ADD TAG</Text>
      </Pressable>
      )

  return (
    <View style={styles.mainContainer}>

      <View style={styles.contentContainer}>
        <View style={styles.scrollableItem}>

          <View style={styles.recipeSectionContainer}>

            <Text style={[styles.heading, styles.textBlack]}>Add Recipe</Text>
          </View>
          <Text style={[styles.bodyCopy, styles.textBlack]}>TITLE:</Text>
          <TextInput
            value={title}
            placeholder='Required'
            style={[styles.textInput, styles.textGreyDark]}
            onChangeText={(title) => setTitle(title)}
          />
          <Text style={[styles.bodyCopy, styles.textBlack]}>SERVING SIZE:</Text>
          <Picker
            style={[styles.picker, styles.bodyCopy, styles.textBlack]}
            selectedValue={servingSize.type}
            onValueChange={(itemValue, itemIndex) => setServingSize({ ...servingSize, type: itemValue })}
          >
            <Picker.Item label='SERVES' value='SERVES' />
            <Picker.Item label='MAKES' value='MAKES' />
          </Picker>
          <TextInput
            value={servingSize.number}
            placeholder='Required'
            style={[styles.textInput, styles.textGreyDark]}
            keyboardType='numeric'
            onChangeText={(number) => setServingSize({ ...servingSize, number })}
          />
          <Text style={[styles.bodyCopy, styles.textBlack]}>MINS TO MAKE:</Text>
          <TextInput
            value={timeMinutes}
            placeholder='Required'
            style={[styles.textInput, styles.textGreyDark]}
            keyboardType='numeric'
            onChangeText={(timeMinutes) => setTimeMinutes(timeMinutes)}
          />
          <View style={styles.recipeSectionContainer}>

            <Text style={[styles.bodyCopy, styles.textBlack]}>INGREDIENTS:</Text>
            <View style={styles.recipeFieldHeader}>
              {renderIngredientsWarning}
              {renderedIngredients}
            </View>
            {ingredientForm}
            {ingredientBtn}
          </View>
          <View style={styles.recipeSectionContainer}>

            <Text style={[styles.bodyCopy, styles.textBlack]}>STEPS:</Text>
            <View style={styles.recipeFieldHeader}>
              {renderStepsWarning}
              {renderedSteps}
            </View>
            {stepForm}
            {stepBtn}
          </View>
          <Text style={[styles.bodyCopy, styles.textBlack]}>NOTES:</Text>
          <TextInput
            value={notes}
            style={[styles.textInput, styles.textGreyDark]}
            placeholder='Optional'
            onChangeText={(notes) => setNotes(notes)}
          />
          <Text style={[styles.bodyCopy, styles.textBlack]}>SOURCE:</Text>
          <TextInput
            value={source}
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
          <View>
            <View style={styles.recipeSectionContainer}>

              <Text style={[styles.bodyCopy, styles.textBlack]}>YOM RATING:</Text>

              {renderRating}
              <View style={styles.recipeTagsContainer} />
              {renderClearRating}
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
      </View>
    </View>
  )
}
