import { withApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import generatedIntrospection from "../generated/fragment.json";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  name: "hanzi",
  version: "1.0",
  cache: new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
  }),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: "cache-first",
    },
  },
});

export default withApollo(client);
