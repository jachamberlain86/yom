import { StyleSheet } from 'react-native'

const yomBlack = '#000'
const yomWhite = '#EEE'
const yomGreyDark = '#545353'
const yomGreyLight = '#C4C4C4'
const yomGreyLightest = '#E5E5E5'

const yomFont = 'JosefinSans_600SemiBold'

const ratio = 1.5
const regular = 16
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: yomWhite,
    alignItems: 'center',
    justifyContent: 'center'
  },
  authContainer: {
    flex: 1,
    backgroundColor: yomBlack,
    color: yomWhite,
    justifyContent: 'center',
    padding: bigger
  },
  logoLarge: {
    alignSelf: 'center',
    fontSize: huge,
    color: yomWhite,
    fontFamily: yomFont,
    paddingBottom: huge,
    paddingTop: hugest
  },
  button: {
    height: biggest,
    marginTop: regular,
    marginBottom: regular,
    paddingBottom: regular,
    paddingTop: big,
    backgroundColor: yomWhite,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    backgroundColor: yomWhite,
    marginTop: regular,
    marginBottom: regular
  },
  buttonWhite: {
    backgroundColor: yomWhite
  },
  buttonGreyDark: {
    backgroundColor: yomGreyDark
  },
  buttonText: {
    fontSize: big,
    fontFamily: yomFont
  },
  fieldHeader: {
    fontSize: regular,
    fontFamily: yomFont
  },
  textWhite: {
    color: yomWhite
  },
  textBlack: {
    color: yomBlack
  }
})
