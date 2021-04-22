import { createSlice } from '@reduxjs/toolkit';

export const recipesSlice = createSlice( {
  name: 'recipes',
  initialState: [ {
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
        metric: {
          quantity: 100,
          unit: 'gram'
        },
        imperial: {
          quantity: 3.5,
          unit: 'ounce'
        },
        aisle: 'diary',
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
  } ],
  reducers: {
    toggleInPlan: {
      reducer ( state, action ) {
      },
      prepare ( inPlan ) {
        return {
          payload: {
            inPlan
          }
        };
      }
    }
  }
} );

export const { toggleInPlan } = recipesSlice.actions;

export default recipesSlice.reducer;