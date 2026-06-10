import { View, Text, FlatList } from 'react-native';
import { useMutation, useQuery } from "@apollo/client/react";
import { ReviewItem } from "./SingleRepository";
import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_USER } from "../graphql/queries";

const ItemSeparator = () => <View style={{ height: 10 }}></View>

const MyReviews = () => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { includeReviews: true }
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_USER, variables: { includeReviews: true } }]
  })

  const deleteHandler = async (id) => {
    await deleteReview({ variables: { deleteReviewId: id } })
  }

  if(loading) return <Text>loading...</Text>
  if(error) return <Text>error...</Text>

  const reviews = data?.me.reviews.edges;

  const reviewNodes = reviews ?
    reviews.map(review => review.node)
    : [];

    console.log(reviewNodes);
  return(
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} displayButtons={true} deleteReview={deleteHandler}/>}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.id}
    />
  );

}
export default MyReviews;