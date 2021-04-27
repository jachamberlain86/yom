import React from 'react'

import { StyleSheet, PixelRatio } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const colors = {
  yomBlack: '#000',
  yomWhite: '#EEE',
  yomGreyDark: '#545353',
  yomGreyLight: '#C4C4C4',
  yomGreyLightest: '#E5E5E5',
  yomRedPale: '#F05D5D',
  yomRed: 'red'
}

const yomFont = 'JosefinSans_600SemiBold'

const ratio = 1.5
const regular = 16 * PixelRatio.getFontScale()
const small = regular / ratio
const smaller = small / ratio
const smallest = smaller / ratio
const tiny = smallest / ratio
const tinier = tiny / ratio
const tiniest = tinier / ratio
const big = regular * ratio
const bigger = big * ratio
const biggest = bigger * ratio
const huge = biggest * ratio
const huger = huge * ratio
const hugest = huger * ratio
const giant = hugest * ratio

export const tabBarStyle = {
  backgroundColor: colors.yomBlack
}
export const headerStyle = {
  backgroundColor: colors.yomBlack,
  height: 100,
  shadowColor: 'transparent'
}
export const headerTitleStyle = {
  fontSize: big,
  fontFamily: yomFont,
  color: colors.yomWhite
}

export const headerLeftContainerStyle = {
  padding: regular
}
export const headerRightContainerStyle = {
  padding: regular
}
export const headerTitleContainerStyle = {
  padding: regular
}
export const authHeaderOptions = {
  headerTitleAlign: 'center',
  headerTitle: 'YOM',
  headerBackImage: ({ size, color }) => <MaterialCommunityIcons name='chevron-left' color={colors.yomWhite} size={20} />,
  headerBackTitleVisible: false,
  headerStyle: headerStyle,
  headerTitleStyle: headerTitleStyle,
  headerLeftContainerStyle: headerLeftContainerStyle,
  headerTitleContainerStyle: headerTitleContainerStyle,
  cardStyle: { backgroundColor: colors.yomBlack },
  gestureEnabled: true
}
export const mainHeaderOptions = {
  headerTitleAlign: 'center',
  headerTitle: 'YOM',
  headerBackImage: ({ size, color }) => <MaterialCommunityIcons name='chevron-left' color={colors.yomWhite} size={20} />,
  headerBackTitleVisible: false,
  headerStyle: headerStyle,
  headerTitleStyle: headerTitleStyle,
  headerLeftContainerStyle: headerLeftContainerStyle,
  headerRightContainerStyle: headerRightContainerStyle,
  headerTitleContainerStyle: headerTitleContainerStyle,
  cardStyle: { backgroundColor: colors.yomWhite },
  gestureEnabled: true
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.yomBlack
    // width: '100%',
    // height: '100%'
  },
  bottomTabNav: {
    backgroundColor: colors.yomBlack
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.yomWhite,
    justifyContent: 'center',
    width: '100%'
  },
  authContainer: {
    flex: 1,
    backgroundColor: colors.yomBlack
  },
  authContentContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1,
    justifyContent: 'center',
    minWidth: 200
  },
  mainContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1,
    maxWidth: 600
  },
  contentContainer: {
    minWidth: 300,
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    margin: bigger,
    marginTop: big,
    marginBottom: big,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: colors.yomBlack
  },
  headerContainer: {
    margin: bigger,
    marginTop: big,
    marginBottom: 0,
    padding: regular,
    backgroundColor: colors.yomBlack
  },
  headerContainerInternal: {
    marginTop: small,
    marginBottom: small,
    padding: regular,
    backgroundColor: colors.yomBlack
  },
  logoLarge: {
    alignSelf: 'center',
    marginTop: regular,
    marginBottom: regular,
    fontSize: huge,
    color: colors.yomWhite,
    fontFamily: yomFont
  },
  button: {
    margin: bigger,
    marginTop: big,
    marginBottom: 0,
    padding: regular,
    backgroundColor: colors.yomBlack
  },
  buttonSmall: {
    margin: regular,
    marginTop: small,
    marginBottom: 0,
    padding: small,
    backgroundColor: colors.yomBlack
  },
  tag: {
    margin: regular,
    marginTop: small,
    marginBottom: regular,
    padding: small,
    backgroundColor: colors.yomGreyDark
  },
  scrollableItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll',
    padding: big,
    minWidth: 200
  },
  fixedItem: {
    overflow: 'scroll',
    padding: big
  },
  recipeCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.yomGreyLightest,
    marginTop: small,
    marginBottom: small
  },
  recipeCardImage: {
    width: 70,
    height: 70
  },
  recipeCardIcon: {
    backgroundColor: colors.yomGreyLight,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recipeCardIconRed: {
    backgroundColor: colors.yomRedPale
  },
  recipeCardTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: small,
    paddingLeft: regular,
    paddingRight: regular,
    justifyContent: 'flex-start'
  },
  recipeCardDetailsContainer: {
    flex: 1,
    padding: regular,
    flexDirection: 'row',
    backgroundColor: colors.yomGreyDark
  },
  recipeCardDetailsTextContainer: {
    flex: 1
  },
  recipeTextContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  recipeSectionContainer: {
    marginBottom: big
  },
  recipeTagsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  formFields: {
    marginTop: regular,
    marginBottom: regular
  },
  textInput: {
    color: colors.yomWhite,
    width: 220,
    marginTop: small,
    marginBottom: regular,
    padding: small,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.yomBlack,
    alignSelf: 'stretch'
  },
  picker: {
    backgroundColor: colors.yomWhite,
    marginTop: small,
    marginBottom: regular,
    padding: small,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.yomBlack,
    alignSelf: 'stretch'
  },
  buttonWhite: {
    backgroundColor: colors.yomWhite
  },
  buttonGreyDark: {
    backgroundColor: colors.yomGreyDark
  },
  buttonBlack: {
    backgroundColor: colors.yomBlack
  },
  buttonGreyLight: {
    backgroundColor: colors.yomGreyLight
  },
  buttonText: {
    fontFamily: yomFont,
    fontSize: regular,
    lineHeight: big,
    textTransform: 'uppercase'
  },
  fieldHeader: {
    fontSize: big,
    lineHeight: bigger,
    fontFamily: yomFont
  },
  textWhite: {
    color: colors.yomWhite
  },
  textBlack: {
    color: colors.yomBlack
  },
  textRed: {
    color: colors.yomRed
  },
  textGreyDark: {
    color: colors.yomGreyDark
  },
  bodyCopy: {
    fontFamily: yomFont,
    fontSize: regular,
    lineHeight: big
  },
  heading: {
    fontFamily: yomFont,
    fontSize: big,
    lineHeight: bigger,
    textTransform: 'uppercase'
  },
  headingInternal: {
    fontFamily: yomFont,
    fontSize: regular,
    lineHeight: big,
    textTransform: 'uppercase'
  },
  recipeFieldHeader: {
    marginTop: small
  },
  centerVertical: {
    // justifySelf: 'center'
  },
  centerHorizontal: {
    alignSelf: 'center'
  },
  drawerMenuItem: {
    paddingTop: regular,
    paddingBottom: regular,
    textAlign: 'right'
  },
  inputImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: '50%'
  },
  fixedRatio: {
    aspectRatio: 1
  },
  cameraButton: {
    margin: 10,
    backgroundColor: colors.yomWhite,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: colors.yomGreyLight,
    width: 80,
    height: 80,
    borderRadius: 40
  },
  galleryButton: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yomGreyDark
  },
  imagePageContainer: {
    flex: 1,
    padding: 20
  }
})
