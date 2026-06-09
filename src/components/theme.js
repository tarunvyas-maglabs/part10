import { Platform } from "react-native";

const theme = {
  colors: {
    primary: '#0366d6',
    textPrimary: 'black',
    textSecondary: 'grey',
    secondary: '#e1e4e8',
  },
  fontSizes: {
    heading: 20,
    body: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'roboto',
      ios: 'san francisco',
      default: 'System'
    }),
    secondary: ''
  },
  fontWeights: {
    normal: '400',
    bold: '700',
    semiBold: '600'
  },
}

export default theme;