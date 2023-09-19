import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import {
  ApolloClient, InMemoryCache, ApolloProvider,
} from "@apollo/client";
import router from "./routes/router.tsx";

const client = new ApolloClient({
  uri: import.meta.env.VITE_EIGHT_STEPS_BACKEND_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
