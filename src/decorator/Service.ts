import { injectable } from "inversify";

export function Service<T extends new (...args: any[]) => any>(ServiceClass: T) {
  async function getContainer() {
    const { container } = await import("@pages/container"); // Lazy dynamic import
    return container;
  }

  getContainer().then((container) => {
    if (!container.isBound(ServiceClass)) {
      container.bind(ServiceClass).toSelf().inSingletonScope();
    }
  });

  return injectable()(ServiceClass);
}
