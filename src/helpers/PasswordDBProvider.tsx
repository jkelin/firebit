import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { IPasswordDB } from '../passwordDB/index';
import { PasswordDBProviderContext, PasswordDBProviderContextTypes } from './common';

interface Props {
  passwordDB: IPasswordDB;
}

interface State {}

export class PasswordDBProvider extends React.PureComponent<Props, State> {
  static childContextTypes = PasswordDBProviderContextTypes;

  getChildContext(): PasswordDBProviderContext {
    return {
      getPasswordDB: () => this.props.passwordDB,
    };
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.props.children}
      </div>
    );
  }
}
