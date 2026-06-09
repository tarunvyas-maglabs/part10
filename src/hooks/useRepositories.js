import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useState, useEffect } from 'react';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
      variables: { orderBy, orderDirection, searchKeyword},
      fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data?.repositories,
    loading,
    refetch
  };
}

export default useRepositories;