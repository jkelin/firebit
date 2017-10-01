import * as React from 'react';
import { IPasswordDB } from "../passwordDB/common";
import { Login } from "./Login";
import { withPasswordDB, getFunType } from "../helpers/index";
import { connect } from "react-redux";
import { RootState } from "../store/index";
import { Navbar } from "./Navbar";
import { InnerLayout } from "./InnerLayout";

function mapStateToProps(state: RootState) {
  return {
    isLoggedIn: state.global.isLoggedIn
  }
}

const mapStateToPropsType = getFunType(mapStateToProps);

interface Props {}

interface State {}

class LayoutPresentational extends React.Component<typeof mapStateToPropsType & Props, State> {
  render() {
    if (!this.props.isLoggedIn) {
      return <Login />
    }

    return [
      <Navbar />,
      this.props.isLoggedIn && <InnerLayout />
    ] as any
  }
}

export const Layout = connect(mapStateToProps, null, null, {pure: false})(LayoutPresentational);
