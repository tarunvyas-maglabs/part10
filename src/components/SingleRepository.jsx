import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native'

import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';
import theme from './theme';
import RepositoryItem from './RepositoryItem';
import { useNavigate, useParams } from 'react-router-native';
import { format} from 'date-fns';

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
  }, 
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    flexGrow: 1,
    maxWidth: 500
  },
  button: {
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: theme.fontSizes.heading,
    textAlign: 'center',
    fontWeight: theme.fontWeights.semiBold,
    color: 'white'
  },
  viewButton: {
    backgroundColor: theme.colors.primary
  },
  deleteButton: {
    backgroundColor: '#FF3E44'
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
    marginVertical: 5,
    width: '100%'
  }


})

export const ReviewItem = ({ review, deleteReview, displayButtons }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed')
      },
      {
        text: 'Delete',
        onPress: () => deleteReview(review.id)
      }
    ]);
  }

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
      {displayButtons &&
        <>
          <View style={styles.line} />
          <View style={styles.buttonsContainer}>
            <Pressable style={[styles.button, styles.viewButton, { flex: 1 }]} onPress={() => navigate(`/${review.repositoryId}`)}>
              <Text style={styles.buttonText}>View Repository</Text>
            </Pressable>
            <Pressable onPress={handleDelete} style={[styles.button, styles.deleteButton, { flex: 1 }]}>
              <Text style={styles.buttonText}>Delete Review</Text>
            </Pressable>
          </View>
        </>
        }
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
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;
  
  const repository = data?.repository;
  const reviews = repository.reviews;
  const reviewNodes = reviews ?
    reviews.edges.map(edge => edge.node)
    : [];

  return(
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} displayButtons={false}/>}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <View style={{ marginBottom: 10 }}><RepositoryItem item={repository} displayButton={true}/></View>}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository;