import { action, makeAutoObservable, observable } from "mobx";
import { matchPath } from "react-router-dom";
import { ArticleService } from "@services/ArticleService";
import { inject } from "inversify";
import { ArticlesService } from "@services/ArticlesService";

export class ArticleDetailViewModel {
  @observable categoryId = "";
  @observable articleId = "";

  @observable articleService: ArticleService;
  @observable articlesService: ArticlesService;

  constructor(
    @inject(ArticleService) articleService: ArticleService,
    @inject(ArticlesService) articlesService: ArticlesService
  ) {
    makeAutoObservable(this);
    this.articleService = articleService;
    this.articlesService = articlesService;
    this.loadArticle();

    window.addEventListener("popstate", () => this.loadArticle());
  }

  get article() {
    return this.articleService?.article;
  }

  get loading() {
    return this.articleService?.loading;
  }

  get error() {
    return this.articleService?.error;
  }

  @action loadArticle() {
    const match = matchPath("/:categoryId/:articleId", window.location.pathname);

    if (!match || !match.params?.categoryId || !match.params?.articleId) {
      return;
    }

    this.categoryId = match.params.categoryId;
    this.articleId = match.params.articleId;

    this.articleService?.loadArticle(this.articleId);
    this.articlesService?.loadArticles(this.categoryId);
  }
}
