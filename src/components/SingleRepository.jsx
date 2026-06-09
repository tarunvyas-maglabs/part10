import { View, Text, StyleSheet, Image, Pressable } from 'react-native'

import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';
import theme from './theme';
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { FlatList } from 'react-native';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
    display: 'flex',
    gap: 10
  },
  rating: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  header: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
  },
  flexHeader: {
    gap: 5,
    flex: 1
  },
  ratingHeader: {
    textAlign: 'center',
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary
  }
})

export const ReviewItem = ({ review }) => {
  return(
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.rating}>
          <Text style={styles.ratingHeader}>{review.rating}</Text>
        </View>
        <View style={styles.flexHeader}>
          <Text style={styles.header}>{review.user.username}</Text>
          <Text style={{ color: theme.colors.textSecondary }}>{format(review.createdAt, 'dd MMM yyyy')}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });
  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;
  
  const repository = data?.repository;
  const reviews = repository.reviews;
  const reviewNodes = reviews ?
    reviews.edges.map(edge => edge.node)
    : [];

  return(
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item}/>}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <View style={{ marginBottom: 10 }}><RepositoryItem item={repository} displayButton={true}/></View>}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository;