import * as React from 'react';
import { Menu, Input, Icon } from 'semantic-ui-react';
import { IPasswordDB } from "../passwordDB/common";
import { Login } from "./Login";
import { withPasswordDB, getFunType } from "../helpers/index";
import { connect, Dispatch } from "react-redux";
import { RootState } from "../store/index";
import { GlobalThunks } from "../store/global";

function mapStateToProps(state: RootState) {
  return {
    isSearching: state.global.isSearching,
    search: state.global.search
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    setSearch: (what: string) => dispatch(GlobalThunks.Search(what))
  }
}

const mapStateToPropsType = getFunType(mapStateToProps);
const mapDispatchToPropsType = getFunType(mapDispatchToProps);

interface Props {}

interface State {}

class NavbarPresentational extends React.Component<typeof mapDispatchToPropsType & typeof mapStateToPropsType & Props, State> {
  render() {
    return (
      <Menu stackable size="mini">
        <Menu.Item name='firebit' header>FireBit</Menu.Item>
        <Menu.Item>
          <Input autoFocus icon placeholder='Search...' loading={this.props.isSearching}>
            <input onChange={e => this.props.setSearch(e.target.value)} value={this.props.search} />
            <Icon name='search' />
          </Input>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item icon="setting" name='settings' />
          <Menu.Item icon="lock" name='logout' active={false} />
        </Menu.Menu>
      </Menu>
    );
  }
}

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarPresentational);