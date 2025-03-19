import { Container } from "inversify";
import { ArticleService } from "@services/ArticleService";
import { ArticlesService } from "@services/ArticlesService";
import { HomeViewModel } from "./Home/HomeViewModel";
import { ArticleDetailViewModel } from "./ArticleDetail/ArticleDetailViewModel";

const container = new Container();

// 📌 Registrace služeb
container.bind(ArticleService).toSelf().inSingletonScope();
container.bind(ArticlesService).toSelf().inSingletonScope();

container.bind(HomeViewModel).toSelf().inSingletonScope();
container.bind(ArticleDetailViewModel).toSelf().inSingletonScope();

// 📌 Exportujeme plně inicializovaný container
export { container };
