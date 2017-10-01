import * as React from 'react';
import { HoCComponentType, PasswordDBProviderContextTypes, PasswordDBProviderContext } from "./common";
import { IPasswordDB } from "../passwordDB/index";

export function withPasswordDB<TOriginalProps, TInjectedProps>(selector: (db: IPasswordDB) => TInjectedProps) {
  return function withPasswordDBInner(Component: HoCComponentType<TOriginalProps & TInjectedProps>): HoCComponentType<TOriginalProps> {
    class WithPasswordDB extends React.Component<TInjectedProps, {}> {
      static contextTypes = PasswordDBProviderContextTypes;

      render() {
        const context: PasswordDBProviderContext = this.context;
        const additionalProps = selector(context.getPasswordDB());
        return <Component {...this.props} {...additionalProps} />;
      }
    }
    
    return WithPasswordDB as any;
  }
}
