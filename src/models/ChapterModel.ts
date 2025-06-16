import { ObservableClass } from "@decorator/ObservableClass";
import { action, observable } from "mobx";

@ObservableClass
class ChapterModel {
  @observable slug!: string;
  @observable content!: string;
  @observable order!: number;
  @observable name!: string;

  public get nextChapterId() {
    return this.order + 1;
  }

  @action update<T extends Partial<ChapterModel>>(json: T) {
    this.name = json.name ?? "";
    this.content = json.content ?? "";
    this.slug = json.slug ?? "";
    this.order = json.order ?? 0;
  }
}

export default ChapterModel;
