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
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.yomBlack
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
    backgroundColor: colors.yomBlack,
    color: colors.yomWhite,
    justifyContent: 'center',
    paddingLeft: huge,
    paddingRight: huge
  },
  mainContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: bigger,
    marginTop: big,
    marginBottom: big,
    padding: big,
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
    alignSelf: 'center',
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
    padding: regular,
    justifyContent: 'flex-end',
    textOverflow: 'ellipsis'
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
    flexWrap: 'wrap'
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
    color: colors.yomGreyLightest,
    marginTop: small,
    marginBottom: regular,
    padding: small
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
  buttonText: {
    fontSize: big,
    fontFamily: yomFont
  },
  fieldHeader: {
    fontSize: big,
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
  }
})
