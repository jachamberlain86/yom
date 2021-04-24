import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase from 'firebase'

export const postRecipe = createAsyncThunk(
  'recipes/recipeAdded',
  async recipe => {
    try {
      console.log('this called')
      const response = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .collection('recipes').doc(recipe.id).set(recipe)
      console.log('response ', response)
    } catch (err) {
      console.log(err)
    }
  })

export const putRecipe = createAsyncThunk(
  'recipes/recipeUpdated',
  async recipe => {
    try {
      console.log('this called')
      const response = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .collection('recipes').doc(recipe.id).set(recipe)
      console.log('response ', response)
    } catch (err) {
      console.log(err)
    }
  })

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState: [{
    id: '1234567890',
    title: 'tasty cheese',
    servingSize: {
      type: 'SERVES',
      number: 4
    },
    timeMinutes: 120,
    ingredients: [
      {
        id: 'cheese',
        name: 'cheese',
        modifiers: ['grated'],
        uk: {
          amount: 100,
          unit: 'g'
        },
        us: {
          amount: 3.5,
          unit: 'oz'
        },
        aisle: 'DIARY'
      }
    ],
    steps: [
      {
        number: 1,
        instruction: 'Take cheese out of fridge'
      },
      {
        number: 2,
        instruction: 'Put cheese in mouth'
      }
    ],
    notes: 'Cheese is great',
    source: 'Cows',
    imageUrl: null,
    tags: [
      'CHEAP',
      'TASTY'
    ],
    rating: null,
    inMenu: false,
    dateAdded: Date.now()
  }],
  reducers: {
    recipeAdded: {
      reducer (state, action) {
        state.push(action.payload)
      },
      prepare (recipe) {
        return {
          payload: {
            recipe
          }
        }
      }
    },
    recipeUpdated: {
      reducer (state, action) {
        const recipe = action.payload
        let existingRecipe = state.find(oldRecipe => oldRecipe.id === recipe.id)
        if (existingRecipe) existingRecipe = recipe
      },
      prepare (recipe) {
        return {
          payload: {
            recipe
          }
        }
      }
    }
  }
})

export const { recipeAdded, recipeUpdated } = recipesSlice.actions

export default recipesSlice.reducer
