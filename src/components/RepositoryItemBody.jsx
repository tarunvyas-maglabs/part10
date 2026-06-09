import { View, Text, StyleSheet  } from 'react-native';

import theme from './theme';

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  primaryText: {
    color: theme.colors.primaryText,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.semiBold,
    fontFamily: theme.fonts.main,
    textAlign: 'center'
  },
  secondaryText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    textAlign: 'center'
  }
})

const RepositoryItemBody = ({ forksCount, reviewCount, stargazersCount, ratingAverage }) => {
  return(
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.primaryText}>{stargazersCount > 1000 ? `${Math.round(stargazersCount/100)/10}k`: stargazersCount }</Text>
        <Text style={styles.secondaryText}>Stars</Text>
      </View>
      <View>
        <Text style={styles.primaryText}>{forksCount> 1000 ? `${Math.round(forksCount/100)/10}k`: forksCount}</Text>
        <Text style={styles.secondaryText}>Forks</Text>
      </View>
      <View>
        <Text style={styles.primaryText}>{reviewCount}</Text>
        <Text style={styles.secondaryText}>Reviews</Text>
      </View>
      <View>
        <Text style={styles.primaryText}>{ratingAverage}</Text>
        <Text style={styles.secondaryText}>Rating</Text>
      </View>
    </View>
  )
}

export default RepositoryItemBody