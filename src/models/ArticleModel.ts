import { ObservableClass } from "@decorator/ObservableClass";
import { observable, action } from "mobx";

@ObservableClass
class ArticleModel {
  @observable slug!: string;
  @observable content!: string;
  @observable order!: number;

  @observable
  private _title!: string; // 📌 Vnitřní proměnná pro title

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  @action update<T extends Partial<ArticleModel>>(json: T) {
    this.title = json.title ?? "";
    this.content = json.content ?? "";
    this.order = json.order ?? 0;
  }
}

export default ArticleModel;

