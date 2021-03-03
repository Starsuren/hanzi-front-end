import {withApollo} from "next-apollo";
import {ApolloClient, InMemoryCache } from '@apollo/client';
import generatedIntrospection from '../generated/fragment.json';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials:'include',
  cache: new InMemoryCache({ possibleTypes: generatedIntrospection.possibleTypes})
});

export default withApollo(client);