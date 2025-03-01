import { ObservableClass } from "@decorator/ObservableClass";
import { observable, action } from "mobx";

@ObservableClass
class ArticleModel {
  @observable slug!: string;
  @observable content!: string;
  @observable order!: number;
  
  @observable
  private _title!: string;

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  @action updateContent(newContent: string) {
    this.content = newContent;
  }

  @action update(json: any) {
    Object.keys(json).forEach((key) => {
      if (key in this) {
        const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), key);
        
        if (descriptor && typeof descriptor.set === "function") {
          // Pokud existuje setter, použijeme ho
          (this as any)[key] = json[key];
        } else if (Object.prototype.hasOwnProperty.call(this, key)) {
          // Pokud je to přímo vlastnost instance, nastavíme hodnotu přímo
          (this as any)[key] = json[key];
        }
      }
    });
  }
}

export default ArticleModel;
