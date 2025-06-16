import { action, makeAutoObservable, observable } from "mobx";
import { inject } from "inversify";
import { ChapterService } from "@services/ChapterService";

export class HomeViewModel {
  @observable chapterService: ChapterService;

  constructor(@inject(ChapterService) chapterService: ChapterService) {
    makeAutoObservable(this);
    this.chapterService = chapterService;

    window.addEventListener("popstate", () => this.onParamsChange());
  }

  @action async onParamsChange() {
    await this.chapterService?.loadChapter("1");
  }
}
