import React, { useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../../features/User/userSlice.js'
import { fetchRecipes } from '../../../features/Recipes/recipesSlice.js'
import { styles, colors } from '../../../styles/app.jsx'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'

export default function Home ({ navigation }) {
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

  function handleLogOut () {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((err) => {
      console.log(err)
    })
  }

  let homeContent

  if (userStatus === 'loading' || recipesStatus === 'loading') {
    homeContent = (
      <View>
        <MaterialCommunityIcons name='pot-mix' color={colors.yomBlack} size={50} />
        <Text style={[styles.bodyCopy, styles.textBlack]}>loading...</Text>
      </View>
    )
  } else if (userStatus === 'succeeded' && recipesStatus === 'succeeded') {
    homeContent = (

      <View style={styles.scrollableItem}>

        <Pressable
          style={[styles.headerContainerInternal]}
        >
          <Text style={[styles.headingInternal, styles.textWhite]}>ON THE MENU</Text>
        </Pressable>
        <Pressable
          style={[styles.headerContainerInternal, styles.buttonGreyLight]}
        >
          <Text style={[styles.headingInternal, styles.textBlack]}>CREATE MENU</Text>
        </Pressable>
        <Pressable
          style={[styles.headerContainerInternal]}
        >
          <Text style={[styles.headingInternal, styles.textWhite]}>RECIPE BOOK</Text>
        </Pressable>
        <Pressable
          style={[styles.headerContainerInternal, styles.buttonGreyLight]}
        >
          <Text style={[styles.headingInternal, styles.textBlack]}>ADD A RECIPE</Text>
        </Pressable>
        <Pressable
          style={[styles.headerContainerInternal]}
        >
          <Text style={[styles.headingInternal, styles.textWhite]} onPress={() => handleLogOut()}>LOG OUT</Text>
        </Pressable>

      </View>
    )
  } else if (userStatus === 'failed') {
    homeContent = <Text style={[styles.bodyCopy, styles.textBlack]}>{userError}</Text>
  } else if (recipesStatus === 'failed') {
    homeContent = <Text style={[styles.bodyCopy, styles.textBlack]}>{recipesError}</Text>
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        {homeContent}
      </View>
    </View>
  )
}
