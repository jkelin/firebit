import * as React from 'react';
import { IPasswordDB } from "../passwordDB/index";
import { PasswordDBProvider } from "../helpers/PasswordDBProvider";
import { Layout } from "./Layout";
import { Provider } from "react-redux";
import { Store } from "redux";
import { RootStore } from "../store/index";

interface Props {
  passwordDB: IPasswordDB;
  store: RootStore;
}

interface State {}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <Provider store={this.props.store}>
        <PasswordDBProvider passwordDB={this.props.passwordDB}>
          <Layout />
        </PasswordDBProvider>
      </Provider>
    );
  }
}
