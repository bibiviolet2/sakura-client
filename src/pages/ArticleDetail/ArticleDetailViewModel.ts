import { makeAutoObservable, observable, runInAction } from "mobx";
import { matchPath } from "react-router-dom";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { getArticle } from "@graphql/queries/GetArticle";

export class ArticleDetailViewModel {
  article: { slug: string; order: number; name: string; content: string } | null = null;
  categoryId = "";
  articleId = "";
  loading = false;
  error: string | null = null;

  client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    makeAutoObservable(this, {
      article: observable, // ✅ Explicitně nastavíme jako `observable`
    });
    this.client = client;
    this.loadArticle();

    // ✅ Ujistíme se, že `this` bude správný
    window.addEventListener("popstate", () => this.loadArticle());
  }

  loadArticle() {
    const match = matchPath("/:categoryId/:articleId", window.location.pathname);

    if (!match || !match.params?.categoryId || !match.params?.articleId) {
      this.article = null;
      return;
    }

    this.categoryId = match.params.categoryId;
    this.articleId = match.params.articleId;

    this.fetchData();
  }

  async fetchData() {
    if (!this.articleId) return;

    this.loading = true;
    this.error = null;

    try {
      const { data } = await this.client.query({
        query: getArticle,
        variables: { slug: this.articleId },
      });

      runInAction(() => {
        if (data.chapter && data.chapter.results.length > 0) {
          this.article = observable(data.chapter.results[0]); // ✅ Uděláme `article` observable
        } else {
          this.article = null;
          this.error = "Článek nebyl nalezen.";
        }

        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Chyba při načítání článku.";
        this.loading = false;
      });
    }
  }
}
