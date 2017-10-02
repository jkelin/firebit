import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { IPasswordDB } from "../passwordDB/common";
import { Login } from "./Login";
import { withPasswordDB, getFunType } from "../helpers/index";
import { connect } from "react-redux";
import { RootState } from "../store/index";
import { Navbar } from "./Navbar";

function mapStateToProps(state: RootState) {
  return {
    search: state.global.search
  }
}

const mapStateToPropsType = getFunType(mapStateToProps);

interface Props {}

interface State {}

class ItemListPresentational extends React.Component<typeof mapStateToPropsType & Props, State> {
  render() {
    return <Button>Inner layout</Button>
  }
}

export const ItemList = connect(mapStateToProps)(ItemListPresentational);
