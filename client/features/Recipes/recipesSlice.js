import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const updateRecipe = createAsyncThunk('recipes/recipeStateChange', async () => {
  try {
    const recipe = firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).collection('recipes').add()

    const user = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
    if (user.exists) {
      return user.data()
    } else {
      console.log('User doesn\'t exist')
    }
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
      type: 'Serves',
      number: 4
    },
    timeMinutes: 120,
    ingredients: [
      {
        ingredient: 'cheese',
        modifier: 'grated',
        UK: {
          quantity: 100,
          unit: 'gram'
        },
        US: {
          quantity: 3.5,
          unit: 'ounce'
        },
        aisle: 'diary'
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
      'cheap',
      'tasty'
    ],
    rating: null,
    inPlan: false,
    dateAdded: ''
  }],
  reducers: {
    recipeAdded (state, action) {
      state.push(action.payload)
    }
  }
})

export const { recipeAdded } = recipesSlice.actions

export default recipesSlice.reducer
