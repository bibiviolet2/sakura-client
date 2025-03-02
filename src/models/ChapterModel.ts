import { ObservableClass } from "@decorator/ObservableClass";
import ArticleModel from "@models/ArticleModel";
import { observable } from "mobx";

@ObservableClass
class ChapterModel extends ArticleModel {
  @observable name!: string;

  // 📌 Přesměrujeme `title` na `name`
  public override get title() {
    return this.name;
  }

  public override set title(value: string) {
    this.name = value;
  }

  update<T extends Partial<ChapterModel>>(json: T) {
    super.update(json);

    this.name = json.name ?? "";
  }
}


export default ChapterModel;
