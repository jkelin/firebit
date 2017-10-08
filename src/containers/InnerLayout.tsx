import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { getFunType, withPasswordDB } from '../helpers/index';
import { IPasswordDB } from '../passwordDB/common';
import { RootState } from '../store/index';
import { ItemList } from './ItemList';
import { Login } from './Login';
import { Navbar } from './Navbar';

function mapStateToProps(state: RootState) {
  return {
  };
}

const mapStateToPropsType = getFunType(mapStateToProps);

interface Props {}

interface State {}

class InnerLayoutPresentational extends React.Component<typeof mapStateToPropsType & Props, State> {
  render() {
    return <ItemList />;
  }
}

export const InnerLayout = connect(mapStateToProps)(InnerLayoutPresentational);
