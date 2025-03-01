import { makeObservable, isObservableProp } from "mobx";

export function ObservableClass<T extends { new (...args: any[]): {} }>(
  target: T
): T {
  return new Proxy(target, {
    construct(clz, args, newTarget) {
      const obj = Reflect.construct(clz, args, newTarget);

      // Ověříme, zda má třída MobX anotace
      const hasMobxProps = Object.keys(obj).some((key) =>
        isObservableProp(obj, key)
      );

      if (hasMobxProps) {
        try {
          makeObservable(obj);
        } catch (error) {
          console.error("MobX makeObservable error:", error);
        }
      } else {
        console.warn(
          `@ObservableClass: Třída ${clz.name} nemá MobX anotace, makeObservable nebylo voláno.`
        );
      }

      return obj;
    },
  });
}
