import { action, makeAutoObservable } from "mobx";
import "reflect-metadata";
import ArticleModel from "@models/ArticleModel";
import ChapterModel from "@models/ChapterModel";
import client from "@lib/apollo-client";
import { Service } from "@decorator/Service";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { getArticles } from "@graphql/queries/GetArticles";

@Service
export class ArticlesService {
  articles: ArticleModel[] | null = null;
  loading = false;
  error: string | null = null;
  client: ApolloClient<NormalizedCacheObject>;

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
        });

        this.articles = articles
      } else {
        this.articles = null;
        this.error = "Články nebyl nalezen.";
      }

      this.loading = false;
    } catch (error) {
      this.error = "Chyba při načítání článku.";
      this.loading = false;
    }
  }
}
