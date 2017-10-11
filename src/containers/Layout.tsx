import * as React from 'react';
import { connect } from 'react-redux';
import { InnerLayout } from './InnerLayout';
import { Login } from './Login';
import { Navbar } from './Navbar';
import { RootState } from 'store';
import { getFunType } from 'helpers';

function mapStateToProps(state: RootState) {
  return {
    isLoggedIn: state.global.isLoggedIn,
  };
}

const mapStateToPropsType = getFunType(mapStateToProps);

interface Props {}

interface State {}

class LayoutPresentational extends React.Component<typeof mapStateToPropsType & Props, State> {
  render() {
    if (!this.props.isLoggedIn) {
      return <Login />;
    }

    return [
      <Navbar key='navbar' />,
      <InnerLayout key='innerlayout' />,
    ] as any;
  }
}

export const Layout = connect(mapStateToProps, null, null, {pure: false})(LayoutPresentational);
