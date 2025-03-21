import { action, makeAutoObservable, observable, computed } from "mobx";
import "reflect-metadata";
import ArticleModel from "@models/ArticleModel";
import ChapterModel from "@models/ChapterModel";
import client from "@lib/apollo-client";
import { Service } from "@decorator/Service";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { getArticles } from "@graphql/queries/GetArticles";

@Service
export class ArticlesService {
  @observable articles: ArticleModel[] | null = null;
  @observable loading = false;
  @observable error: string | null = null;
  @observable client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    makeAutoObservable(this);
    this.client = client;
  }

  @action async loadArticles(book: string) {
    if (!book) return;

    this.loading = true;
    this.error = null;

    try {
      const { data } = await this.client.query({
        query: getArticles,
        variables: { book: book },
      });

      if (data.chapters && data.chapters.results.length > 0) {
        const articles = data.chapters.results.map((result: any) => {
          const article = new ChapterModel();
          article.update(result);
          return article;
        });
        this.articles = articles;
      } else {
        this.articles = null;
        this.error = "Články nebyly nalezeny.";
      }

      this.loading = false;
    } catch (error) {
      this.error = "Chyba při načítání článku.";
      this.loading = false;
    }
  }

  // ✅ **Vrátí další článek v seznamu**
  @computed getNextArticle() {
    return (articleId: string): ArticleModel | null => {
      if (!this.articles) return null;
      const index = this.articles.findIndex((a) => a.slug === articleId);
      return index !== -1 && index < this.articles.length - 1
        ? this.articles[index + 1]
        : null;
    };
  }

  // ✅ **Vrátí předchozí článek v seznamu**
  @computed getPrevArticle() {
    return (articleId: string): ArticleModel | null => {
      if (!this.articles) return null;
      const index = this.articles.findIndex((a) => a.slug === articleId);
      return index > 0 ? this.articles[index - 1] : null;
    };
  }
}
