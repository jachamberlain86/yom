import { parseIngredients } from '../api/client.js'
import { mockIngredient } from '../api/mock-ingredient.js'
import { mockRecipe } from '../api/mock-recipe.js'
import convert from 'convert-units'
import { titleCase } from 'title-case'
import { sentenceCase } from 'sentence-case'
import firebase from 'firebase'

export function formatRecipeFromLink (recipe) {
  console.log(recipe)
  const formattedRecipe = {
    title: recipe.title
      ? recipe.title
      : 'No title',
    servingSize: recipe.servings
      ? '' + recipe.servings + ''
      : null,
    timeMinutes: '' + recipe.readyInMinutes + ''
      ? recipe.readyInMinutes
      : null,
    ingredients: [],
    steps: [],
    notes: '',
    source: recipe.sourceUrl
      ? recipe.sourceUrl
      : 'No source',
    tags: [],
    rating: null,
    imageUrl: recipe.image
      ? recipe.image
      : null
  }

  if (recipe.extendedIngredients) {
    for (const ingredient of recipe.extendedIngredients) {
      formattedRecipe.ingredients.push(formatIngredientForRecipe(ingredient))
    }
  }

  if (recipe.analyzedInstructions[0].steps) {
    for (const step of recipe.analyzedInstructions[0].steps) {
      formattedRecipe.steps.push({ number: step.number, instruction: step.step })
    }
  }

  if (recipe.vegetarian) formattedRecipe.tags.push('VEGETARIAN')
  if (recipe.vegan) formattedRecipe.tags.push('VEGAN')
  if (recipe.glutenFree) formattedRecipe.tags.push('GLUTEN FREE')
  if (recipe.dairyFree) formattedRecipe.tags.push('DAIRY FREE')
  if (recipe.veryHealthy) formattedRecipe.tags.push('HEALTHY')
  if (recipe.cheap) formattedRecipe.tags.push('CHEAP')
  if (recipe.sustainable) formattedRecipe.tags.push('SUSTAINABLE')
  if (recipe.cuisines.length) {
    for (const cuisine of recipe.cuisines) {
      formattedRecipe.tags.push(cuisine)
    }
  }
  if (recipe.dishTypes.length) {
    for (const dish of recipe.dishTypes) {
      formattedRecipe.tags.push(dish)
    }
  }
  if (recipe.diets.length) {
    for (const diet of recipe.diets) {
      formattedRecipe.tags.push(diet)
    }
  }
  if (recipe.occasions.length) {
    for (const occasion of recipe.occasions) {
      formattedRecipe.tags.push(occasion)
    }
  }
  return formattedRecipe
}

export async function formatRecipeFromText (recipe) {
  try {
    recipe.title = recipe.title.toLowerCase()
    let ingredientString = ''
    const formattedIngredients = []
    for (const ingredient of recipe.ingredients) {
      if (typeof ingredient === 'string') ingredientString += ingredient + '\\n'
      else formattedIngredients.push(ingredient)
    }
    if (ingredientString !== '') {
      ingredientString = ingredientString.slice(0, -2)
      const ingredients = await parseIngredients(ingredientString, recipe.servingSize)

      for (const ingredient of ingredients) {
        formattedIngredients.push(formatIngredientForRecipe(ingredient))
      }
    }
    recipe.ingredients = formattedIngredients

    const sentences = recipe.notes.split('.')
    for (let sentence of sentences) {
      sentence = sentenceCase(sentence)
    }
    recipe.notes = sentences.join('.')
    for (let tag of recipe.tags) {
      tag = tag.toUpperCase()
    }
    if (recipe.inMenu === true) recipe.inMenu = true
    else recipe.inMenu = false
    if (!recipe.dateAdded) recipe.dateAdded = Date.now()
    if (!recipe.imageUrl) recipe.imageUrl = null
    return recipe
  } catch (err) {
    console.log(err)
  }
}

export function formatRecipeFromImage () {
  console.log('this called')
}

function formatIngredientForRecipe (ingredient) {
  const formattedIngredient = {
    uk: {},
    us: {}
  }

  if (ingredient.name) {
    formattedIngredient.name = ingredient.name.toLowerCase()
  } else {
    formattedIngredient.name = 'ERROR: ' + ingredient.original
    formattedIngredient.id = formattedIngredient.name
    formattedIngredient.uk = { unit: null, amount: null }
    formattedIngredient.us = { unit: null, amount: null }
    formattedIngredient.modifiers = []
    formattedIngredient.aisle = ''
    return formattedIngredient
  }

  if (ingredient.id) {
    formattedIngredient.id = ingredient.id
  } else {
    formattedIngredient.id = ingredient.name.toLowerCase()
  }

  ingredient.unit = ingredient.unit.toLowerCase()

  const unitsUk = ['ml', 'l', 'g', 'kg', 'cm', 'mm']
  const unitsUs = ['fl oz', 'cup', 'cups', 'pt', 'qt', 'gal', 'lb', 'oz', 'in', 'stick', 'sticks']

  if (ingredient.unit && unitsUk.includes(ingredient.unit)) {
    const convertedUnit = calcUkToUsConversion(ingredient)
    formattedIngredient.uk = { ...convertedUnit.uk }
    formattedIngredient.us = { ...convertedUnit.us }
  } else if (ingredient.unit && unitsUs.includes(ingredient.unit)) {
    const convertedUnit = calcUsToUkConversion(ingredient)
    formattedIngredient.uk = { ...convertedUnit.uk }
    formattedIngredient.us = { ...convertedUnit.us }
  } else if (ingredient.unit) {
    formattedIngredient.uk.unit = ingredient.unit
    formattedIngredient.uk.amount = ingredient.amount
    formattedIngredient.us.unit = ingredient.unit
    formattedIngredient.us.amount = ingredient.amount
  } else {
    formattedIngredient.uk.amount = ingredient.amount
    formattedIngredient.us.amount = ingredient.amount
  }

  if (ingredient.meta) {
    for (const modifier of ingredient.meta) {
      modifier.toLowerCase()
    }
    formattedIngredient.modifiers = [...ingredient.meta]
  }
  if (ingredient.aisle) {
    formattedIngredient.aisle = ingredient.aisle.toUpperCase()
  } else {
    formattedIngredient.aisle = 'OTHER'
  }

  return formattedIngredient
}

function calcUkToUsConversion (ingredient) {
  const convertedUnits = {
    uk: {
      amount: null,
      unit: null
    },
    us: {
      amount: null,
      unit: null
    }
  }

  switch (ingredient.unit) {
    case 'ml':
      convertedUnits.uk.unit = ingredient.unit
      convertedUnits.uk.amount = ingredient.amount
      convertedUnits.us.unit = 'fl oz'
      convertedUnits.us.amount = parseFloat(convert(ingredient.amount).from('ml').to('fl-oz').toFixed(2))
      break
    case 'l':
      convertedUnits.uk.unit = ingredient.unit
      convertedUnits.uk.amount = ingredient.amount
      convertedUnits.us.unit = 'pt'
      convertedUnits.us.amount = parseFloat(convert(ingredient.amount).from('l').to('pnt').toFixed(2))
      break
    case 'g':
      convertedUnits.uk.unit = ingredient.unit
      convertedUnits.uk.amount = ingredient.amount
      convertedUnits.us.unit = 'oz'
      convertedUnits.us.amount = parseFloat(convert(ingredient.amount).from('g').to('oz').toFixed(2))
      break
    case 'kg':
      convertedUnits.uk.unit = ingredient.unit
      convertedUnits.uk.amount = ingredient.amount
      convertedUnits.us.unit = 'lb'
      convertedUnits.us.amount = parseFloat(convert(ingredient.amount).from('kg').to('lb').toFixed(2))
      break
    case 'cm':
      convertedUnits.uk.unit = ingredient.unit
      convertedUnits.uk.amount = ingredient.amount
      convertedUnits.us.unit = 'in'
      convertedUnits.us.amount = parseFloat(convert(ingredient.amount).from('cm').to('in').toFixed(2))
      break
    case 'mm':
      convertedUnits.uk.unit = ingredient.unit
      convertedUnits.uk.amount = ingredient.amount
      convertedUnits.us.unit = 'in'
      convertedUnits.us.amount = parseFloat(convert(ingredient.amount).from('mm').to('in').toFixed(2))
      break
  }

  return convertedUnits
}

function calcUsToUkConversion (ingredient) {
  const convertedUnits = {
    uk: {
      amount: null,
      unit: null
    },
    us: {
      amount: null,
      unit: null
    }
  }

  switch (ingredient.unit) {
    case 'fl oz':
      convertedUnits.us.unit = ingredient.unit
      convertedUnits.us.amount = ingredient.amount
      convertedUnits.uk.unit = 'ml'
      convertedUnits.uk.amount = Math.round(convert(ingredient.amount).from('fl-oz').to('ml'))
      break
    case 'pt':
      convertedUnits.us.unit = ingredient.unit
      convertedUnits.us.amount = ingredient.amount
      convertedUnits.uk.unit = 'l'
      convertedUnits.uk.amount = parseFloat(convert(ingredient.amount).from('pnt').to('l').toFixed(2))
      break
    case 'qt':
      convertedUnits.us.unit = ingredient.unit
      convertedUnits.us.amount = ingredient.amount
      convertedUnits.uk.unit = 'l'
      convertedUnits.uk.amount = parseFloat(convert(ingredient.amount).from('qt').to('l').toFixed(2))
      break
    case 'gal':
      convertedUnits.us.unit = ingredient.unit
      convertedUnits.us.amount = ingredient.amount
      convertedUnits.uk.unit = 'l'
      convertedUnits.uk.amount = parseFloat(convert(ingredient.amount).from('gal').to('l').toFixed(2))
      break
    case 'lb':
      convertedUnits.us.unit = ingredient.unit
      convertedUnits.us.amount = ingredient.amount
      convertedUnits.uk.unit = 'kg'
      convertedUnits.uk.amount = parseFloat(convert(ingredient.amount).from('lb').to('kg').toFixed(2))
      break
    case 'oz':
      convertedUnits.us.unit = ingredient.unit
      convertedUnits.us.amount = ingredient.amount
      convertedUnits.uk.unit = 'g'
      convertedUnits.uk.amount = Math.round(convert(ingredient.amount).from('oz').to('g'))
      break
    case 'in':
      convertedUnits.us.unit = ingredient.unit
      convertedUnits.us.amount = ingredient.amount
      convertedUnits.uk.unit = 'mm'
      convertedUnits.uk.amount = Math.round(convert(ingredient.amount).from('in').to('mm'))
      break
    case 'stick' || 'sticks':
      convertedUnits.us.unit = ingredient.unit
      convertedUnits.us.amount = ingredient.amount
      convertedUnits.uk.unit = 'cup'
      convertedUnits.uk.amount = ingredient.amount / 2
      break
    case 'cup' || 'cups':
      if (ingredient.consistency === 'liquid') {
        convertedUnits.us.unit = ingredient.unit
        convertedUnits.us.amount = ingredient.amount
        convertedUnits.uk.unit = 'ml'
        convertedUnits.uk.amount = Math.round(convert(ingredient.amount).from('cup').to('ml'))
      } else {
        convertedUnits.us.unit = ingredient.unit
        convertedUnits.us.amount = ingredient.amount
        convertedUnits.uk.unit = ingredient.unit
        convertedUnits.uk.amount = ingredient.amount
      }
      break
  }

  return convertedUnits
}
