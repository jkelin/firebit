import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { PasswordDBProvider } from '../helpers/PasswordDBProvider';
import { IPasswordDB } from '../passwordDB/index';
import { RootStore } from '../store/index';
import { Layout } from './Layout';

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
