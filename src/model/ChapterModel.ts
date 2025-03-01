import { ObservableClass } from "@decorator/ObservableClass";
import { observable } from "mobx";
import ArticleModel from "./ArticleModel";

@ObservableClass
class ChapterModel extends ArticleModel {
  @observable name!: string;

  public override get title() {
    return this.name;
  }
}

export default ChapterModel;
