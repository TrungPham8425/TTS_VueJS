// src/graphql/subscriptions.js
import gql from "graphql-tag";

export const NEW_USER_SUBSCRIPTION = gql`
  subscription {
    newUser {
      id
      name
      email
    }
  }
`;
