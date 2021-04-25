import { StyleSheet, PixelRatio } from 'react-native'

export const colors = {
  yomBlack: '#000',
  yomWhite: '#EEE',
  yomGreyDark: '#545353',
  yomGreyLight: '#C4C4C4',
  yomGreyLightest: '#E5E5E5'
}

const yomFont = 'JosefinSans_600SemiBold'

const ratio = 1.5
const regular = 14 * PixelRatio.getFontScale()
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
    justifyContent: 'center'
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
    flewGrow: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: bigger,
    padding: big,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: colors.yomBlack
  },
  headerContainer: {
    margin: bigger,
    marginBottom: 0,
    padding: regular,
    flex: 1,
    backgroundColor: colors.yomBlack
  },
  halfScreen: {
    flex: 1,
    height: '50%'
  },
  thirdScreen: {
    flex: 1,
    height: '33%'
  },
  twoThirdsScreen: {
    flex: 1,
    height: '66%',
    justifyContent: 'center'
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
    paddingBottom: regular,
    paddingTop: big,
    backgroundColor: colors.yomWhite,
    justifyContent: 'center',
    alignItems: 'center'
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
  bodyCopy: {
    fontFamily: yomFont,
    fontSize: regular
  },
  headingWhite: {
    fontFamily: yomFont,
    fontSize: big,
    color: colors.yomWhite
  }
})
