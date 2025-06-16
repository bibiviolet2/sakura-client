import { action, makeAutoObservable, observable } from "mobx";
import "reflect-metadata";
import ChapterModel from "@models/ChapterModel";
import client from "@lib/apollo-client";
import { Service } from "@decorator/Service";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { getChapters } from "@graphql/queries/GetArticles";

@Service
export class ChaptersService {
  @observable chapters: ChapterModel[] | null = null;
  @observable loading = false;
  @observable error: string | null = null;
  @observable client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    makeAutoObservable(this);
    this.client = client;
  }

  @action async loadChapters(book: string) {
    if (!book) return;

    this.loading = true;
    this.error = null;

    try {
      const { data } = await this.client.query({
        query: getChapters,
        variables: { book: book },
      });

      if (data.chapters && data.chapters.results.length > 0) {
        const chapters = data.chapters.results.map((result: any) => {
          const chapter = new ChapterModel();
          chapter.update(result);
          return chapter;
        });
        this.chapters = chapters;
      } else {
        this.chapters = null;
        this.error = "Články nebyly nalezeny.";
      }

      this.loading = false;
    } catch (error) {
      this.error = "Chyba při načítání článku.";
      this.loading = false;
    }
  }
}
