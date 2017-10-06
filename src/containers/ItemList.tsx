import * as React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { getFunType, withPasswordDB } from "../helpers/index";
import { IPasswordDB } from "../passwordDB/common";
import { RootState } from "../store/index";
import { Login } from "./Login";
import { Navbar } from "./Navbar";

function mapStateToProps(state: RootState) {
  return {
    search: state.global.search,
  };
}

const mapStateToPropsType = getFunType(mapStateToProps);

interface Props {}

interface State {}

class ItemListPresentational extends React.Component<typeof mapStateToPropsType & Props, State> {
  public render() {
    return <Button>Inner layout</Button>;
  }
}

export const ItemList = connect(mapStateToProps)(ItemListPresentational);
