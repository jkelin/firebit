import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { getFunType } from '../helpers/index';
import { ItemList } from './ItemList';
import { Login } from './Login';
import { Navbar } from './Navbar';
import { RootState } from 'store';
import { compose } from 'recompose';
import { withRoute, InjectedRoute } from 'react-router5';

function mapStateToProps(state: RootState) {
  return {
  };
}

const mapStateToPropsType = getFunType(mapStateToProps);

interface Props {}

interface State {}

class InnerLayoutPresentational extends React.Component<typeof mapStateToPropsType & Props & InjectedRoute, State> {
  render() {
    const route = this.props.route;
    const names = route!.name.split('.');

    return (
      <main id='main'>
        <ItemList key='item-list' />
        {names[0] === 'item' && <p>item</p>}
      </main>
    );
  }
}

export const InnerLayout = compose(
  connect(mapStateToProps),
  withRoute,
)(InnerLayoutPresentational);
