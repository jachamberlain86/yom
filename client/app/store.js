import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from '../features/example/exampleSlice.js'
import userReducer from '../features/User/userSlice.js'
import recipesReducer from '../features/Recipes/recipesSlice.js'


export default configureStore({
  reducer: {
    example: exampleReducer,
    user: userReducer,
    recipes: recipesReducer
  }
})
