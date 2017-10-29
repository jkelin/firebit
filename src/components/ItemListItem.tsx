import * as React from 'react';
import { Table, Button, Menu, Icon } from 'semantic-ui-react';
import { ItemId } from 'passwordDB';
import { Link } from 'react-router5';

interface Props {
  id: ItemId;
  title: string;
  lastModification: string;
  username?: string;
  url?: string;
  isActive: boolean;

  copyPassword: () => any;
  copyUsername: () => any;
}

interface State {}

export class ItemListItem extends React.Component<Props, State> {
  shouldComponentUpdate(props: Props) {
    return this.props.lastModification !== props.lastModification || this.props.isActive !== props.isActive;
  }

  render() {
    return (
      <div className={`item${this.props.isActive ? ' active' : ''}`} id={`item-list-item-${this.props.id}`}>
        <Link className='description' routeName='item' routeParams={{ itemId: this.props.id }} >
          <div className='first-row'>
            <b className='title'>{this.props.title}</b>
          </div>
          <div className='second-row'>
            {this.props.username}
          </div>
        </Link>
        <div className='actions'>
          {this.props.copyUsername &&
            <Button
              className='button copy-username'
              icon='user'
              title='Copy username to clipboard'
              onClick={this.props.copyUsername}
            />
          }

          {this.props.copyPassword &&
            <Button
              className='button copy-password'
              icon='privacy'
              title='Copy password to clipboard'
              onClick={this.props.copyPassword}
            />
          }

          {this.props.url &&
            <a className='ui icon button open-url' href={this.props.url} title='Open url'>
              <Icon
                name='external'
              />
            </a>
          }
        </div>
      </div>
    );
  }
}
