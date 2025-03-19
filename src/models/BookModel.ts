import { ObservableClass } from "@decorator/ObservableClass";
import { observable, action } from "mobx";

export enum BookType {
  DSO = "dso",
  EXPL = "expl",
  COMMENT = "comment"
}

@ObservableClass
class BookModel {
  @observable slug!: string;
  @observable name!: string;
  @observable type!: BookType;

  @action update<T extends Partial<BookModel>>(json: T) {
    this.name = json.name ?? "";
    this.slug = json.slug ?? "";
    this.type = json.type ?? BookType.DSO;
  }
}

export default BookModel;

