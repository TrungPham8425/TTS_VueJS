// src/services/apollo.js
import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
} from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP link cho query/mutation
const httpLink = new HttpLink({
  uri: "https://jsonplaceholder.typicode.com/users", // chỉnh lại URI server của bạn
});

// WebSocket link cho subscription
const wsLink = new GraphQLWsLink(
  createClient({
    url: "https://jsonplaceholder.typicode.com/users", // WebSocket endpoint
  })
);

// Tự động chọn link theo loại operation
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Apollo client
const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
