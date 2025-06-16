import { Container } from "inversify";
import { ChapterService } from "@services/ChapterService";
import { HomeViewModel } from "./Home/HomeViewModel";
import { ChapterDetailViewModel } from "./ChapterDetail/ChapterDetailViewModel";
import { BookService } from "@services/BookService";
import { ChaptersService } from "@services/ChaptersService";

const container = new Container();

container.bind(ChapterService).toSelf().inSingletonScope();
container.bind(ChaptersService).toSelf().inSingletonScope();
container.bind(BookService).toSelf().inSingletonScope();

container.bind(HomeViewModel).toSelf().inSingletonScope();
container
  .bind(ChapterDetailViewModel)
  .toDynamicValue(
    () =>
      new ChapterDetailViewModel(
        container.get(ChapterService),
        container.get(ChaptersService),
        container.get(BookService)
      )
  );

export { container };
