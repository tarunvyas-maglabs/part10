import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy!, $orderDirection:OrderDirection, $searchKeyword: String ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          ownerAvatarUrl
          description
          language
          forksCount
          ratingAverage
          stargazersCount
          reviewCount
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repositoryId
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      forksCount
      description
      ownerAvatarUrl
      stargazersCount
      language
      reviewCount
      ratingAverage
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORIES_FROM_KEYWORD = gql`
  query repositories($searchKeyword: String){
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          ownerAvatarUrl
          description
          language
          forksCount
          ratingAverage
          stargazersCount
          reviewCount
        }
      }
    }
  }
`
