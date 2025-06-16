import { action, computed, makeAutoObservable, observable } from "mobx";
import { matchPath } from "react-router-dom";
import { inject } from "inversify";
import { ChaptersService } from "@services/ChaptersService";
import { BookService } from "@services/BookService";
import { BookType } from "@models/BookModel";
import { ChapterService } from "@services/ChapterService";

export class ChapterDetailViewModel {
  @observable bookSlug = "";
  @observable chapterSlug = "";
  @observable type = "";
  @observable pageTitle = "Načítám článek...";
  @observable initialized = false;

  @observable chapterService: ChapterService;
  @observable chaptersService: ChaptersService;
  @observable bookService: BookService;

  constructor(
    @inject(ChapterService) chapterService: ChapterService,
    @inject(ChaptersService) chaptersService: ChaptersService,
    @inject(BookService) bookService: BookService
  ) {
    makeAutoObservable(this);
    this.chapterService = chapterService;
    this.chaptersService = chaptersService;
    this.bookService = bookService;

    window.addEventListener("popstate", () => this.onParamsChange());
  }

  @action async onParamsChange() {
    this.initialized = false;
    await this.loadChapter();

    this.initialized = true;
    this.setTitle();
  }

  get chapter() {
    return this.chapterService?.chapter;
  }

  get chapters() {
    return this.chaptersService?.chapters;
  }

  get book() {
    return this.bookService?.book;
  }

  get loading() {
    return this.chapterService?.loading || !this.initialized;
  }

  get error() {
    return this.chapterService?.error;
  }

  @action setTitle() {
    switch (this.book?.type) {
      case BookType.DSO:
        this.pageTitle = this.chapter?.name
          ? `${this.chapter?.name} - ${this.book.name} :: Dcera svého otce`
          : "Kapitola nenalezena";
        break;
      default:
        this.pageTitle = `${
          this.chapter?.name ?? "Epizoda nenalezena"
        } :: Dcera svého otce`;
    }
  }

  @action async loadChapter() {
    const match = matchPath(
      "/:bookSlug/:chapterSlug",
      window.location.pathname
    );

    if (!match || !match.params?.bookSlug || !match.params?.chapterSlug) {
      return;
    }

    this.bookSlug = match.params.bookSlug;
    this.chapterSlug = match.params.chapterSlug;

    await this.chapterService?.loadChapter(this.chapterSlug);
    await this.chaptersService?.loadChapters(this.bookSlug);
    await this.bookService?.loadBook(this.bookSlug);
  }
}
