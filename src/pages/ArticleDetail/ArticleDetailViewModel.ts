import { makeAutoObservable, observable } from "mobx";
import { matchPath } from "react-router-dom";
import { ArticleService } from "@services/ArticleService";
import { inject } from "inversify";

export class ArticleDetailViewModel {
  categoryId = "";
  articleId = "";

  @observable articleService: ArticleService;

  constructor(@inject(ArticleService) articleService: ArticleService) {
    makeAutoObservable(this);
    this.articleService = articleService;
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

  loadArticle() {
    const match = matchPath("/:categoryId/:articleId", window.location.pathname);

    if (!match || !match.params?.categoryId || !match.params?.articleId) {
      return;
    }

    this.categoryId = match.params.categoryId;
    this.articleId = match.params.articleId;

    this.articleService?.loadArticle(this.articleId);
  }
}
