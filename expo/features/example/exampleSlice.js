import { createSlice } from '@reduxjs/toolkit';

export const exampleSlice = createSlice( {
  name: 'example',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incremeentByAmount: ( state, action ) => {
      state.value += action.payload;
    }
  }
} );

export const { increment, decrement, incremeentByAmount } = exampleSlice.actions;

export default exampleSlice.reducer;

const fetchUserById = userId => {
  return async ( dispatch, getState ) => {
    try {
      const user = await //userApi.fetchById(userId)
        dispatch( userLoaded( user ) );
    } catch ( err ) {

    }
  };
};

export const incrementAsync = amount => dispatch => {
  setTimeout( () => {
    dispatch( incrementByAmount( amount ) );
  }, 1000 );
};