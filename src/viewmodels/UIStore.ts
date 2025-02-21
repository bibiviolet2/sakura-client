import { makeAutoObservable } from "mobx";

class UIStore {
  isSidebarOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

export default UIStore;
