import { View, Text, StyleSheet, Image, Pressable, Button } from 'react-native'
import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryItemBody from './RepositoryItemBody';
import theme from './theme';
import { useNavigate } from "react-router";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    display: 'flex',
    gap: 10
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10
  },
  flexColumnContainer: {
    display: 'flex',
    gap: 2,
    flex: 1,
  },
  primaryText: {
    fontSize: 20,
    fontWeight: '700',
    flexWrap: 'wrap',
    fontFamily: theme.fonts.main
  },
  secondaryText: {
    fontSize: 16,
    flexWrap: 'wrap',
    color: 'gray',
    fontFamily: theme.fonts.main
  },
  languageTag: {
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    justifyContent: 'space-around'
  },
  centerAlign: {
    alignSelf: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  }
})

const RepositoryItem = ({ item, displayButton }) => {
  const navigate = useNavigate();

  return(
    <View style={styles.container} testID="repositoryItem">
      <RepositoryItemHeader fullName={item.fullName} ownerAvatarUrl={item.ownerAvatarUrl} description={item.description} language={item.language}/>
      <RepositoryItemBody forksCount={item.forksCount} ratingAverage={item.ratingAverage} stargazersCount={item.stargazersCount} reviewCount={item.reviewCount}/>
      {
        displayButton &&
        <Pressable style={styles.button} onPress={() => Linking.openURL(item?.url)}>
          <Text style={[{color: 'white'}, styles.centerAlign]}>Open in Github</Text>
        </Pressable>
      }
    </View>
  )
}

export default RepositoryItem;