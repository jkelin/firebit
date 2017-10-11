import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table, Grid } from 'semantic-ui-react';
import { getFunType, withPasswordDB } from '../helpers/index';
import { IPasswordDB } from '../passwordDB/common';
import { RootState } from '../store/index';
import { Login } from './Login';
import { Navbar } from './Navbar';
import { ItemListItem } from '../components/ItemListItem';
import { SearchItem, ItemId, SpecialKeys } from '../passwordDB/index';
import { GlobalThunks } from '../store/global';

function mapStateToProps(state: RootState) {
  return {
    results: state.global.searchResults,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    copyPasswordToClipboard: (item: ItemId) => dispatch(GlobalThunks.CopyToClipboard(item, { key: SpecialKeys.password })),
    copyUsernameToClipboard: (item: ItemId) => dispatch(GlobalThunks.CopyToClipboard(item, { key: SpecialKeys.username })),
  };
}

const mapDispatchToPropsType = getFunType(mapDispatchToProps);
const mapStateToPropsType = getFunType(mapStateToProps);

interface Props {}

interface State {}

class ItemListPresentational extends React.Component<typeof mapStateToPropsType & typeof mapDispatchToPropsType & Props, State> {
  render() {
    if (this.props.results) {
      return (
        <div className='item-list'>
            {this.props.results.map(r => <ItemListItem
              key={r.id}
              id={r.id}
              title={r.title}
              username={r.username}
              url={r.url}
              lastModification={r.lastModification}
              copyUsername={this.props.copyUsernameToClipboard.bind(this, r.id)}
              copyPassword={this.props.copyPasswordToClipboard.bind(this, r.id)}
            />)}
        </div>
      );
    } else {
      return <p>No results found</p>;
    }
  }
}

export const ItemList = connect(mapStateToProps, mapDispatchToProps)(ItemListPresentational);
