import { action, makeAutoObservable } from "mobx";
import "reflect-metadata";
import client from "@lib/apollo-client";
import { Service } from "@decorator/Service";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import BookModel from "@models/BookModel";
import { getBook } from "@graphql/queries/GetBook";

@Service
export class BookService {
  book: BookModel | null = null;
  loading = false;
  error: string | null = null;
  client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    makeAutoObservable(this);
    this.client = client;
  }

  @action async loadBook(bookId: string) {
    if (!bookId) return;

    this.loading = true;
    this.error = null;

    try {
      const { data } = await this.client.query({
        query: getBook,
        variables: { slug: bookId },
      });

      if (data.book && data.book.results.length > 0) {
        this.book = new BookModel();
        this.book.update(data.chapter.results[0]);
      } else {
        this.book = null;
        this.error = "Článek nebyl nalezen.";
      }

      this.loading = false;
    } catch (error) {
      this.error = "Chyba při načítání článku.";
      this.loading = false;
    }
  }
}
