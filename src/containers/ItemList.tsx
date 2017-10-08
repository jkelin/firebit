import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Grid } from 'semantic-ui-react';
import { getFunType, withPasswordDB } from '../helpers/index';
import { IPasswordDB } from '../passwordDB/common';
import { RootState } from '../store/index';
import { Login } from './Login';
import { Navbar } from './Navbar';
import { ItemListItem } from '../components/ItemListItem';
import { Item } from '../passwordDB/index';

function mapStateToProps(state: RootState) {
  return {
    results: state.global.searchResults,
  };
}

const mapStateToPropsType = getFunType(mapStateToProps);

interface Props {}

interface State {}

class ItemListPresentational extends React.Component<typeof mapStateToPropsType & Props, State> {
  copyUsername = (item: Item) => {
    console.log('Copy username', item.username, 'of', item.id, 'to clipboard');
  }

  copyPassword = (item: Item) => {
    console.log('Copy password', item.username, 'of', item.id, 'to clipboard');
  }

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
              copyUsername={this.copyUsername.bind(this, r)}
              copyPassword={this.copyPassword.bind(this, r)}
            />)}
        </div>
      );
    } else {
      return <p>No results found</p>;
    }
  }
}

export const ItemList = connect(mapStateToProps)(ItemListPresentational);
