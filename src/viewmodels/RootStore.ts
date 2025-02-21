import { createContext } from "react";
import UIStore from "@viewmodels/UIStore";

class RootStore {
  uiStore: UIStore;

  constructor() {
    this.uiStore = new UIStore();
  }
}

// Vytvoříme jedinou instanci store
const rootStore = new RootStore();

// Vytvoříme React kontext pro MobX store
export const RootStoreContext = createContext(rootStore);

export default rootStore;
