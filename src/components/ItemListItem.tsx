import * as React from 'react';
import { Table, Button, Menu } from 'semantic-ui-react';
import { SearchItem, ItemId } from '../passwordDB/index';

interface Props {
  id: ItemId;
  title: string;
  lastModification: string;
  username?: string;
  url?: string;

  copyPassword: () => any;
  copyUsername: () => any;
}

interface State {}

export class ItemListItem extends React.Component<Props, State> {
  shouldComponentUpdate(props: Props) {
    return this.props.lastModification !== props.lastModification;
  }

  render() {
    return (
      <div className='item' id={`item-list-item-${this.props.id}`}>
        <a className='description' href='#'>
          <div className='first-row'>
            <b className='title'>{this.props.title}</b>
          </div>
          <div className='second-row'>
            {this.props.username}
          </div>
        </a>
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
            <Button
              className='button open-url'
              icon='external'
              title='Open url'
            />
          }
        </div>
      </div>
    );
  }
}
