import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL, // 🔹 Nahraď podle svého Apollo Serveru
  }),
  cache: new InMemoryCache(),
});

export default client;
