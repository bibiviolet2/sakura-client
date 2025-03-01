import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000", // 🔹 Nahraď podle svého Apollo Serveru
  }),
  cache: new InMemoryCache(),
});

export default client;
