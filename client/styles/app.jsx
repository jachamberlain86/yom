import { StyleSheet, PixelRatio } from 'react-native'

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
  // flexGrow: 0
}
export const headerStyle = {
  backgroundColor: colors.yomBlack
  // flexGrow: 0
}
export const headerTitleStyle = {
  fontSize: regular,
  fontFamily: yomFont,
  color: colors.yomWhite
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.yomBlack,
    width: '100%',
    height: '100%'
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
    paddingLeft: biggest,
    paddingRight: biggest
  },
  mainContainer: {
    flex: 1,
    height: '100%'
  },
  contentContainer: {
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
    // flewGrow: 0,
    margin: bigger,
    marginTop: big,
    marginBottom: 0,
    padding: regular,
    backgroundColor: colors.yomBlack
  },
  headerContainerInternal: {
    // flewGrow: 0,
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
    height: biggest,
    marginTop: regular,
    marginBottom: regular,
    padding: regular,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSmall: {
    height: big,
    marginTop: small,
    marginBottom: small,
    padding: regular,
    backgroundColor: colors.yomBlack,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tag: {
    height: big,
    marginTop: small,
    marginBottom: small,
    padding: regular,
    backgroundColor: colors.yomGreyDark,
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase'
  },
  scrollableItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll',
    padding: big
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
    flexWrap: 'wrap',
    padding: small,
    paddingLeft: regular,
    paddingRight: regular,
    justifyContent: 'flex-end'
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
    fontSize: big,
    lineHeight: bigger,
    fontFamily: yomFont
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
  }
})
