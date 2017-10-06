import * as React from "react";
import { Button } from "semantic-ui-react";
import { IPasswordDB } from "../passwordDB/index";
import { PasswordDBProviderContext, PasswordDBProviderContextTypes } from "./common";

interface Props {
  passwordDB: IPasswordDB;
}

interface State {}

export class PasswordDBProvider extends React.PureComponent<Props, State> {
  public static childContextTypes = PasswordDBProviderContextTypes;

  public getChildContext(): PasswordDBProviderContext {
    return {
      getPasswordDB: () => this.props.passwordDB,
    };
  }

  public render() {
    return (
      <div style={{height: "100%"}}>
        {this.props.children}
      </div>
    );
  }
}
