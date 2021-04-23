import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase from 'firebase'

export const fetchUser = createAsyncThunk('user/userStateChange', async () => {
  try {
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

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    status: 'idle',
    error: null
  },
  reducers: {
    userStateChange: {
      reducer (state, action) {
        state.currentUser = action.payload
      },
      prepare (currentUser) {
        return {
          payload: {
            currentUser
          }
        }
      }
    }
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { userStateChange } = userSlice.actions

export default userSlice.reducer
