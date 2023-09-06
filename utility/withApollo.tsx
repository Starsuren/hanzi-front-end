import { withApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedCharResponse } from "../generated/graphql";
import generatedIntrospection from "../generated/fragment.json";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  name: "hanzi",
  version: "1.0",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          findChar: {
            keyArgs: ["char"],
            merge(
              existing: PaginatedCharResponse | undefined,
              incoming: PaginatedCharResponse
            ) {
              return {
                ...incoming,
                charResponse: [
                  ...(existing?.charResponse || []),
                  ...incoming?.charResponse,
                ],
              };
            },
          },
        },
      },
    },

    possibleTypes: generatedIntrospection.possibleTypes,
  }),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: "cache-first",
    },
  },
});

export default withApollo(client);
