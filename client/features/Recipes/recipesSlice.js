import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase from 'firebase'

export const selectRecipeById = (state, recipeId) => state.recipes.recipes.find(recipe => recipe.id === recipeId)

export const fetchRecipes = createAsyncThunk('recipes/recipeStateChange', async () => {
  try {
    const recipes = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('recipes').get()
    if (!recipes.docs.empty) {
      return recipes.docs.map(doc => doc.data())
    } else {
      console.log('No recipes saved')
    }
  } catch (err) {
    console.log(err)
  }
})

export const postRecipe = createAsyncThunk(
  'recipes/recipeAdded',
  async recipe => {
    try {
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .collection('recipes').doc(recipe.id).set(recipe)
      const response = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .collection('recipes').doc(recipe.id).get()
      if (response.exists) {
        return response.data()
      } else {
        console.log('Recipe doesn\'t exist')
      }
    } catch (err) {
      console.log(err)
    }
  })

export const putRecipe = createAsyncThunk(
  'recipes/recipeUpdated',
  async recipe => {
    try {
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .collection('recipes').doc(recipe.id).update(recipe)
      const response = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .collection('recipes').doc(recipe.id).get()
      if (response.exists) {
        return response.data()
      } else {
        console.log('Recipe doesn\'t exist')
      }
    } catch (err) {
      console.log(err)
    }
  })

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    status: 'idle',
    error: null
  },
  reducers: {
    recipeStateChange: {
      reducer (state, action) {
        state.recipes = action.payload
      }
    },
    prepare (recipes) {
      return {
        payload: {
          recipes
        }
      }
    },
    recipeAdded: {
      reducer (state, action) {
        state.recipes.push(action.payload)
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
        let existingRecipe = state.recipes.find(oldRecipe => oldRecipe.id === recipe.id)
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
  },

  extraReducers: {
    [fetchRecipes.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchRecipes.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.recipes = action.payload
    },
    [fetchRecipes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [postRecipe.pending]: (state, action) => {
      state.status = 'loading'
    },
    [postRecipe.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.recipes.push(action.payload)
    },
    [postRecipe.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [putRecipe.pending]: (state, action) => {
      state.status = 'loading'
    },
    [putRecipe.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      const recipe = action.payload
      let existingRecipe = state.recipes.find(oldRecipe => oldRecipe.id === recipe.id)
      if (existingRecipe) existingRecipe = recipe
    },
    [putRecipe.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { recipeAdded, recipeUpdated } = recipesSlice.actions

export default recipesSlice.reducer
