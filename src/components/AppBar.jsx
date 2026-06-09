import { Link , useNavigate } from 'react-router-native';
import { Pressable , View, StyleSheet, Text, ScrollView } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client/react';
import { GET_USER } from '../graphql/queries';
import Constants from 'expo-constants';
import theme from './theme';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: '#24292e',
  },
  text: {
    fontWeight: '700',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: theme.fonts.main
  },
  scrollView: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  }
})

const AppBar = () => {
  const { data } = useQuery(GET_USER);
  const user = data?.me ?? null;
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    navigate('/');
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }

  return <View style={styles.container}>
    <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
      <View style={ styles.buttonContainer }>
        <Link to='/' >
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {!user &&
        <>
          <Link to='/signIn'>
            <Text style={styles.text}>Sign In</Text>
          </Link>
          <Link to='/signUp'>
            <Text style={styles.text}>Sign Up</Text>
          </Link>
      </>
        }
        {user &&
        <>
          <Link to={'/createReview'}>
            <Text style={styles.text}>Create a review</Text>
          </Link>
          <Link to={'/myReviews'}>
            <Text style={styles.text}>My reviews</Text>
          </Link>
          <Pressable onPress={handleLogOut}>
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        </>
        }
      </View>
    </ScrollView>
    </View>
}

export default AppBar;