import { Container } from "inversify";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ArticleService } from "@services/ArticleService";
import { HomeViewModel } from "./Home/HomeViewModel";
import { ArticleDetailViewModel } from "./ArticleDetail/ArticleDetailViewModel";

const container = new Container();

// 📌 Registrace ApolloClientu
const client = new ApolloClient({
  uri: "https://api.example.com/graphql",
  cache: new InMemoryCache(),
});
container.bind(ApolloClient).toConstantValue(client);

// 📌 Registrace služeb
container.bind(ArticleService).toSelf().inSingletonScope();

container.bind(HomeViewModel).toSelf().inSingletonScope();
container.bind(ArticleDetailViewModel).toSelf().inSingletonScope();

// 📌 Exportujeme plně inicializovaný container
export { container };
