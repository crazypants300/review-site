import { gql } from "@apollo/client";

export const QUERY_GET_ME = gql`
  query me {
  me {
    _id
    email
    username
    likedReviews
    dislikedReviews
    savedReviews {
      _id
      imageUrls
      reviewText
      rating
      username
      upvotes
      downvotes
    }
  }
}
`;

export const QUERY_USER = gql`
  query user($User: String) {
    _id
    username
    email
    savedReviews {
      _id
      reviewText
      rating
      username
    }
  }
`;

export const QUERY_REVIEW = gql`
  query review($Review: String) {
    _id
    reviewText
    rating
    username
  }
`;

export const QUERY_REVIEWS = gql`
  query reviews($username: String) {
    reviews(username: $username) {
      _id
      reviewText
      rating
      username
    }
  }
`;

export const GET_REVIEWS = gql`
  query reviews {
    reviews {
      _id
      location
      createdAt
      reviewText
      rating
      username
      imageUrls
      userId
      upvotes
      downvotes
    }
  }
`;

export const GET_REVIEWS_BY_LOCATION = gql`
  query reviewsByLocation($location: String) {
    reviews(location: $location) {
      _id
      location
      createdAt
      reviewText
      rating
      username
    }
  }
`;
