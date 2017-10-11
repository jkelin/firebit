import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Layout } from './Layout';
import { IPasswordDB } from 'passwordDB';
import { RootStore } from 'store';
import { PasswordDBProvider } from 'helpers';

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
