import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { RestLink } from "apollo-link-rest";

// Khởi tạo RestLink để làm việc với REST API
const restLink = new RestLink({
  uri: "https://jsonplaceholder.typicode.com/",
  endpoints: {
    jsonplaceholder: "https://jsonplaceholder.typicode.com/",
  },
});

// Khởi tạo Apollo Client với REST Link
const apolloClient = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

export default apolloClient;
