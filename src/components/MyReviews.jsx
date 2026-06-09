import { View, Text, FlatList } from 'react-native';
import { useQuery } from "@apollo/client/react";
import { ReviewItem } from "./SingleRepository";
import { GET_USER } from "../graphql/queries";

const ItemSeparator = () => <View style={{ height: 10 }}></View>

const MyReviews = () => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { includeReviews: true }
  });

  if(loading) return <Text>loading...</Text>
  if(error) return <Text>error...</Text>

  const reviews = data?.me.reviews.edges;

  const reviewNodes = reviews ?
    reviews.map(review => review.node)
    : [];

  return(
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item}/>}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.id}
    />
  )

}
export default MyReviews;