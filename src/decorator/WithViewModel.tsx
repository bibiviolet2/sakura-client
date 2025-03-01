import React, { Component, ComponentType } from "react";
import { observer } from "mobx-react";
import client from "@lib/apollo-client";

// Dekorátor pro třídové komponenty
export function WithViewModel<T extends new (...args: any[]) => any>(
  ViewModelClass: T
) {
  return function <P extends object>(
    WrappedComponent: ComponentType<P & { viewModel: InstanceType<T> }>
  ): ComponentType<P> {
    const ObservedComponent = observer(WrappedComponent); // ✅ Pozorujeme komponentu

    class WithViewModelComponent extends Component<P> {
      viewModel: InstanceType<T>;

      constructor(props: P) {
        super(props);
        this.viewModel = new ViewModelClass(client);
      }

      componentDidMount() {
        if (typeof this.viewModel.fetchData === "function") {
          this.viewModel.fetchData();
        }
      }

      render() {
        return <ObservedComponent {...(this.props as P)} viewModel={this.viewModel} />;
      }
    }

    return observer(WithViewModelComponent); // ✅ Sledujeme i dekorátor
  };
}
