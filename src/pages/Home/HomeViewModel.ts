import { makeAutoObservable } from "mobx";
import { injectable } from "inversify";


export class HomeViewModel {
  title = "Sakura Online";
  subtitle = `Běžně vnímáme realitu skrze vztah příčiny a následku:
Něco se stane, a to způsobí něco dalšího.
Co kdybychom tento pohled otočili a začali přemýšlet o světě jednak?`;

  content = `
## **Jednak jako staronový pojem**
...
`;

  constructor() {
    makeAutoObservable(this);
  }
}
