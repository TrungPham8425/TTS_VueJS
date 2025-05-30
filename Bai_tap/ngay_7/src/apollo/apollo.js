import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { DefaultApolloClient } from "@vue/apollo-composable";

// HTTP connection to the API
const httpLink = createHttpLink({
  uri:
    process.env.VUE_APP_GRAPHQL_URL ||
    "https://api-us-east-1.hygraph.com/v2/ckz6v7rgm1fvz01w0as7p4nx7/master",
});

// Create a WebSocket link (for subscriptions - note: GraphQL Zero doesn't support subscriptions,
// this is just for demonstration)
const wsLink = new WebSocketLink({
  uri: process.env.VUE_APP_GRAPHQL_WS_URL || "wss://graphqlzero.almansi.me/api",
  options: {
    reconnect: true,
  },
});

// Split links based on operation type
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

// Vue plugin to inject apollo client
export function provideApollo(app) {
  app.provide(DefaultApolloClient, apolloClient);
}
