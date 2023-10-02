import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import {
  InMemoryCache, HttpLink, ApolloProvider, ApolloClient, split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import router from "./routes/router.tsx";

const httpLink = new HttpLink({
  uri: `https://${import.meta.env.VITE_EIGHT_STEPS_BACKEND_URL}`,
});

const wsLink = new GraphQLWsLink(createClient({
  url: "ws://localhost:3000/graphql",
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition"
      && definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
