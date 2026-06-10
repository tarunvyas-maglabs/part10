import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy!, $orderDirection:OrderDirection, $searchKeyword: String, $after: String, $first: Int ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
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
      pageInfo {
        endCursor
        hasNextPage
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
  query repository($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
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
        pageInfo {
          endCursor
          hasNextPage
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
