import React, { ComponentType } from "react";
import { injectable } from "inversify";
import { container } from "@pages/container";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { reaction } from "mobx";

export function WithViewModel<T extends object>(ViewModelClass: {
  new (...args: any[]): T;
}) {
  if (!container.isBound(ViewModelClass)) {
    injectable()(ViewModelClass);
    container.bind(ViewModelClass).toSelf();
  }

  return function <P extends object>(
    WrappedComponent: ComponentType<P & { viewModel: T }>
  ): ComponentType<P> {
    const ComponentWithViewModel: React.FC<P> = (props) => {
      const params = useParams();
      const [viewModel] = useState(() => container.get(ViewModelClass));

      // 🚀 Zavoláme `onParamsChange()` při změně URL parametrů, pokud existuje
      useEffect(() => {
        if (
          "onParamsChange" in viewModel &&
          typeof (viewModel as any).onParamsChange === "function"
        ) {
          (viewModel as any).onParamsChange(params);
        }
      }, [params]);

      // ✅ **Posun na vrchol při změně URL (ale zachováme kotvy)**
      useEffect(() => {
        if (!window.location.hash) {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }, [params]);

      // ✅ Posun nahoru i po reloadu (smooth scrolling)
      useEffect(() => {
        window.addEventListener("load", () => {
          if (!window.location.hash) {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
        });
      }, []);

      // ✅ **Sledujeme změny v `pageTitle` pomocí `reaction()`**
      useEffect(() => {
        const disposer = reaction(
          () => (viewModel as any).pageTitle,
          (newTitle) => {
            if (typeof newTitle === "string") {
              document.title = newTitle;
            }
          },
          { fireImmediately: true } // ⚡ Okamžitě nastavíme title po načtení stránky
        );

        return () => disposer(); // 🧹 Vyčistíme reaction při unmountu
      }, []);

      return <WrappedComponent {...props} viewModel={viewModel} />;
    };

    ComponentWithViewModel.displayName = `WithViewModel(${
      WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return ComponentWithViewModel;
  };
}
