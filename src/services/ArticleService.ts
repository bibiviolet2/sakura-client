import { action, makeAutoObservable } from "mobx";
import "reflect-metadata";
import { getArticle } from "@graphql/queries/GetArticle";
import ArticleModel from "@models/ArticleModel";
import ChapterModel from "@models/ChapterModel";
import client from "@lib/apollo-client";
import { Service } from "@decorator/Service";

@Service
export class ArticleService {
  article: ArticleModel | null = null;
  loading = false;
  error: string | null = null;
  client: any;

  constructor() {
    makeAutoObservable(this);
    this.client = client;
  }

  @action async loadArticle(articleId: string) {
    if (!articleId) return;

    this.loading = true;
    this.error = null;

    try {
      const { data } = await this.client.query({
        query: getArticle,
        variables: { slug: articleId },
      });

      if (data.chapter && data.chapter.results.length > 0) {
        this.article = new ChapterModel();
        this.article.update(data.chapter.results[0]);
      } else {
        this.article = null;
        this.error = "Článek nebyl nalezen.";
      }

      this.loading = false;
    } catch (error) {
      this.error = "Chyba při načítání článku.";
      this.loading = false;
    }
  }
}
