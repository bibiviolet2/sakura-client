import React, { Component, ComponentType } from "react";
import { observer } from "mobx-react";
import { injectable } from "inversify";
import { container } from "@pages/container";

export function WithViewModel<T extends new (...args: any[]) => any>(
  ViewModelClass: T
) {
  if (!Reflect.hasMetadata("inversify:paramtypes", ViewModelClass)) {
    injectable()(ViewModelClass);
  }

  return function <P extends object>(
    WrappedComponent: ComponentType<P & { viewModel: InstanceType<T> }>
  ): ComponentType<P> {
    const ObservedComponent = observer(WrappedComponent);

    class WithViewModelComponent extends Component<P> {
      viewModel: InstanceType<T>;

      constructor(props: P) {
        super(props);

        if (!container.isBound(ViewModelClass)) {
          container.bind(ViewModelClass).toSelf();
        }

        this.viewModel = container.get(ViewModelClass);
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

    return observer(WithViewModelComponent);
  };
}
