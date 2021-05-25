import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/User/userSlice.js'
import recipesReducer from '../features/Recipes/recipesSlice.js'

export default configureStore({
  reducer: {
    user: userReducer,
    recipes: recipesReducer
  }
})
