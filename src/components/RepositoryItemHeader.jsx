import { View, Text, StyleSheet, Image } from 'react-native';
import theme from './theme';


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    gap: 8
  },
  primaryText: {
    color: theme.fontSizes.textPrimary,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
    padding: 0
  },
  secondaryText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main
  },
  languageStyle: {
    color: 'white',
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    alignSelf: 'flex-start',
    fontFamily: theme.fonts.main,
  },
  logo: {
    width: 66,
    height: 58,
    borderRadius: 4,
  }
})


const RepositoryHeader = ({ fullName, description, ownerAvatarUrl, language}) => {
  return(
    <View style={styles.headerContainer}>
      <Image style={styles.logo} source={{ uri: ownerAvatarUrl }}/>
      <View style={styles.textContainer}>
        <Text style={styles.primaryText}>{fullName}</Text>
        <Text style={styles.secondaryText}>{description}</Text>
        <Text style={styles.languageStyle}>{language}</Text>
      </View>
    </View>
  )
}

export default RepositoryHeader;