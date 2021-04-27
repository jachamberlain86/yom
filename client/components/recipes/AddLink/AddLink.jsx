import React, { useState } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native'
import { getRecipeFromLink } from '../../../api/client.js'
import { formatRecipeFromLink } from '../../../controllers/recipe.js'
import { styles } from '../../../styles/app.jsx'

export default function AddLink ({ navigation }) {
  const [url, setUrl] = useState('')

  const canSave = Boolean(url)

  async function handleSaveRecipe () {
    try {
      const response = await getRecipeFromLink(url)
      const recipe = formatRecipeFromLink(response)
      navigation.navigate('Edit New Recipe', { recipe })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.fixedContainer}>

          <View style={styles.recipeSectionContainer}>
            <Text style={[styles.heading, styles.textBlack]}>Upload a recipe</Text>
          </View>
          <TextInput
            style={[styles.textInput, styles.textGreyDark, styles.textInputBorder]}
            placeholder='paste link here'
            onChangeText={(url) => setUrl(url)}
          />
          <Pressable style={[styles.button, styles.buttonBlack]} disabled={!canSave} onPress={() => handleSaveRecipe()}>
            <Text style={[styles.buttonText, styles.textWhite, { textAlign: 'center' }]}>SAVE</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.buttonGreyDark]} onPress={() => navigation.navigate('Recipe Book')}>
            <Text style={[styles.buttonText, styles.textWhite, { textAlign: 'center' }]}>CANCEL</Text>
          </Pressable>
        </View>
      </View>
    </View>

  )
}
