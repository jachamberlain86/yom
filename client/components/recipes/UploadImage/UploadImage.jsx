import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import { styles, colors } from '../../../styles/app.jsx'
import DropDownPicker from 'react-native-dropdown-picker'

export default function UploadImage ({ route, navigation }) {
  console.log(route.params)

  const [textBlocks, setTextBlocks] = useState([])
  const [items, setItems] = useState(
    [{ label: 'IGNORE', value: 'IGNORE' }, { label: 'TITLE', value: 'TITLE' }, { label: 'SERVINGS', value: 'TITLE' }, { label: 'TIME', value: 'TITLE' }, { label: 'INGREDIENT', value: 'INGREDIENT' }, { label: 'STEP', value: 'STEP' }, { label: 'NOTE', value: 'NOTE' }]
  )

  const splitText = route.params.text.split('\n')

  function handleSaveRecipe () {

  }

  const renderedTextSections = splitText.map((textBlock, idx) => {
    return (
      <View key={idx} style={styles.recipeSectionContainer}>
        <Text style={[styles.bodyCopy, styles.textBlack]}>BLOCK {idx + 1}:</Text>
        <TextInput
          value={textBlock}
          multiline
          numberOfLine={3}
          textAlignVertical
          style={[styles.textInput, styles.textGreyDark]}
        />
        <DropDownPicker
          items={items}
          zIndexInverse={6000}
          defaultValue='IGNORE'
          arrowStyle={{ color: colors.yomWhite }}
          labelStyle={[styles.bodyCopy, styles.textWhite]}
          containerStyle={styles.textInput}
          dropDownStyle={{ backgroundColor: colors.yomBlack }}
          onChangeItem={item => setTextBlocks(() => {
            const updatedArr = [...textBlocks]
            updatedArr[idx] = { ...updatedArr[idx], type: item.value }
            return updatedArr
          })}
        />
      </View>
    )
  })

  return (
    <View style={styles.mainContainer}>

      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollableItem}>
          {renderedTextSections}
          <Pressable
            style={[styles.button, styles.buttonBlack]}
            onPress={() => handleSaveRecipe()}
          >
            <Text style={[styles.buttonText, styles.textWhite, { textAlign: 'center' }]}>SAVE</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonGreyDark]}
            onPress={() => navigation.navigate('Recipe Book')}
          >
            <Text style={[styles.buttonText, styles.textWhite, { textAlign: 'center' }]}>CANCEL</Text>
          </Pressable>

          <View style={{ marginBottom: 70 }} />
        </ScrollView>
      </View>
    </View>
  )
}
