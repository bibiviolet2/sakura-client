import { action, computed, makeAutoObservable, observable } from "mobx";
import { matchPath } from "react-router-dom";
import { ArticleService } from "@services/ArticleService";
import { inject } from "inversify";
import { ArticlesService } from "@services/ArticlesService";
import { BookService } from "@services/BookService";
import { BookType } from "@models/BookModel";

export class ArticleDetailViewModel {
  @observable categoryId = "";
  @observable articleId = "";
  @observable type = "";
  @observable pageTitle = "Načítám článek...";
  @observable inited = false;

  @observable articleService: ArticleService;
  @observable articlesService: ArticlesService;
  @observable bookService: BookService;

  constructor(
    @inject(ArticleService) articleService: ArticleService,
    @inject(ArticlesService) articlesService: ArticlesService,
    @inject(BookService) bookService: BookService
  ) {
    makeAutoObservable(this);
    this.articleService = articleService;
    this.articlesService = articlesService;
    this.bookService = bookService;

    window.addEventListener("popstate", () => this.onParamsChange());
  }

  @action async onParamsChange() {
    this.inited = false;
    await this.loadArticle();

    this.inited = true;
    this.setTitle();
  }

  get article() {
    return this.articleService?.article;
  }

  get articles() {
    return this.articlesService?.articles;
  }

  get book() {
    return this.bookService?.book;
  }

  get loading() {
    return this.articleService?.loading || !this.inited;
  }

  @computed get loadingArticles() {
    return this.articlesService?.loading;
  }

  get error() {
    return this.articleService?.error;
  }

  @action setTitle() {
    switch (this.book?.type) {
      case BookType.DSO:
        this.pageTitle = this.article?.title
          ? `${this.article?.title} - ${this.book.name} :: Dcera svého otce`
          : "Kapitola nenalezena";
        break;
      default:
        this.pageTitle = `${
          this.article?.title ?? "Článek nenalezen"
        } :: Sakura Online`;
    }
  }

  @action async loadArticle() {
    const match = matchPath(
      "/:categoryId/:articleId",
      window.location.pathname
    );

    if (!match || !match.params?.categoryId || !match.params?.articleId) {
      return;
    }

    this.categoryId = match.params.categoryId;
    this.articleId = match.params.articleId;

    await this.articleService?.loadArticle(this.articleId);
    await this.articlesService?.loadArticles(this.categoryId);
    await this.bookService?.loadBook(this.categoryId);
  }
}
