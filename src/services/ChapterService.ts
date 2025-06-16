import { action, makeAutoObservable } from "mobx";
import "reflect-metadata";
import { getChapter } from "@graphql/queries/GetChapter";
import ChapterModel from "@models/ChapterModel";
import client from "@lib/apollo-client";
import { Service } from "@decorator/Service";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

@Service
export class ChapterService {
  chapter: ChapterModel | null = null;
  loading = false;
  error: string | null = null;
  client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    makeAutoObservable(this);
    this.client = client;
  }

  @action async loadChapter(chapterSlug: string) {
    if (!chapterSlug) return;

    this.loading = true;
    this.error = null;

    try {
      const { data } = await this.client.query({
        query: getChapter,
        variables: { slug: chapterSlug },
      });

      if (data.chapter && data.chapter.results.length > 0) {
        this.chapter = new ChapterModel();
        this.chapter.update(data.chapter.results[0]);
      } else {
        this.chapter = null;
        this.error = "Článek nebyl nalezen.";
      }

      this.loading = false;
    } catch (error) {
      this.error = "Chyba při načítání článku.";
      this.loading = false;
    }
  }
}
