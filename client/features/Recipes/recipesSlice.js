import { createSlice } from '@reduxjs/toolkit';

const recipesSlice = createSlice( {
  name: 'recipes',
  initialState: [ { title: 'recipe 1' }, { title: 'recipe 2' } ],
  reducers: {}
} );

export default recipesSlice.reducer;