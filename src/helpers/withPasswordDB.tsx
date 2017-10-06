import * as React from "react";
import { IPasswordDB } from "../passwordDB/index";
import { HoCComponentType, PasswordDBProviderContext, PasswordDBProviderContextTypes } from "./common";

export function withPasswordDB<TOriginalProps, TInjectedProps>(selector: (db: IPasswordDB) => TInjectedProps) {
  return function withPasswordDBInner(Component: HoCComponentType<TOriginalProps & TInjectedProps>): HoCComponentType<TOriginalProps> {
    class WithPasswordDB extends React.Component<TInjectedProps, {}> {
      public static contextTypes = PasswordDBProviderContextTypes;

      public render() {
        const context: PasswordDBProviderContext = this.context;
        const additionalProps = selector(context.getPasswordDB());

        return <Component {...this.props} {...additionalProps} />;
      }
    }

    return WithPasswordDB as any;
  };
}
