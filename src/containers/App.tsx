import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Layout } from './Layout';
import { IPasswordDB } from 'passwordDB';
import { RootStore } from 'store';
import { RouterProvider } from 'react-router5';
import { Router } from 'router5';

interface Props {
  passwordDB: IPasswordDB;
  store: RootStore;
  router: Router;
}

interface State {}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <Provider store={this.props.store}>
        <RouterProvider router={this.props.router}>
          <Layout />
        </RouterProvider>
      </Provider>
    );
  }
}
