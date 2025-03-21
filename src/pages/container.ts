import { Container } from "inversify";
import { ArticleService } from "@services/ArticleService";
import { ArticlesService } from "@services/ArticlesService";
import { HomeViewModel } from "./Home/HomeViewModel";
import { ArticleDetailViewModel } from "./ArticleDetail/ArticleDetailViewModel";
import { BookService } from "@services/BookService";

const container = new Container();

// 📌 Registrace služeb (ponecháme jako singletony, protože spravují data)
container.bind(ArticleService).toSelf().inSingletonScope();
container.bind(ArticlesService).toSelf().inSingletonScope();
container.bind(BookService).toSelf().inSingletonScope();

// 📌 ViewModely nebudou singletony, ale dynamicky se vytvoří při každém volání
container.bind(HomeViewModel).toSelf().inSingletonScope(); // HomeViewModel může zůstat singleton
container
  .bind(ArticleDetailViewModel)
  .toDynamicValue(
    () =>
      new ArticleDetailViewModel(
        container.get(ArticleService),
        container.get(ArticlesService),
        container.get(BookService)
      )
  );

// 📌 Exportujeme plně inicializovaný container
export { container };
