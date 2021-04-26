import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../../features/User/userSlice.js'
import { fetchRecipes } from '../../../features/Recipes/recipesSlice.js'
import { styles, colors } from '../../../styles/app.jsx'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Home () {
  const dispatch = useDispatch()
  const userStatus = useSelector(state => state.user.status)
  const userError = useSelector(state => state.user.error)
  const currentUser = useSelector(state => state.user.currentUser)
  const recipesStatus = useSelector(state => state.recipes.status)
  const recipesError = useSelector(state => state.recipes.error)
  const recipes = useSelector(state => state.recipes.recipes)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser())
    }
    if (recipesStatus === 'idle') {
      dispatch(fetchRecipes())
    }
  }, [userStatus, recipesStatus, dispatch])

  let homeContent

  if (userStatus === 'loading' || recipesStatus === 'loading') {
    homeContent = (
      <View>
        <MaterialCommunityIcons name='pot-mix' color={colors.yomBlack} size={50} />
        <Text style={[styles.bodyCopy, styles.textBlack]}>loading...</Text>
      </View>
    )
  } else if (userStatus === 'succeeded' && recipesStatus === 'succeeded') {
    homeContent = <Text style={[styles.bodyCopy, styles.textBlack]}>{currentUser.name} is logged in</Text>
  } else if (userStatus === 'failed') {
    homeContent = <Text style={[styles.bodyCopy, styles.textBlack]}>{userError}</Text>
  } else if (recipesStatus === 'failed') {
    homeContent = <Text style={[styles.bodyCopy, styles.textBlack]}>{recipesError}</Text>
  }

  return (
    <View style={styles.contentContainer}>
      {homeContent}
    </View>
  )
}
