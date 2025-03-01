import { ObservableClass } from "@decorator/ObservableClass";
import { observable, action } from "mobx";

@ObservableClass
class ChapterModel {
  @observable slug!: string;
  @observable order!: number;
  @observable name!: string;
  @observable content!: string;

  @action updateContent(newContent: string) {
    this.content = newContent;
  }
}

export default ChapterModel;
