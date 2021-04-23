import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { getRecipeFromLink } from '../../../api/client.js'
import { formatRecipeFromLink } from '../../../controllers/recipe.js'

export default function AddLink ({ navigation }) {
  const [url, setUrl] = useState('')

  async function handleSaveRecipe () {
    try {
      if (url.length) {
        // const response = await getRecipeFromLink(url)
        const response = {}
        const recipe = formatRecipeFromLink(response)
        console.log(recipe)
        navigation.navigate('Edit Recipe', { recipe })
      } else {
        console.log('please enter a url')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Upload a recipe</Text>
      <TextInput
        placeholder='paste link here'
        onChangeText={(url) => setUrl(url)}
      />
      <Button title='Save' onPress={() => handleSaveRecipe()} />
      <Button title='Cancel' onPress={() => navigation.navigate('Recipe List')} />
    </View>
  )
}
