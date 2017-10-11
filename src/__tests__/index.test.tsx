import * as React from 'react';
import { MockPasswordDB, ItemType, ItemId, FieldId, SpecialKeys, FieldType } from 'passwordDB';
import { createFireBitStore } from 'store';
import { App } from 'containers/App';

import { mount, ReactWrapper } from 'enzyme';
import { spy } from 'sinon';

async function renderApp() {
  const db = new MockPasswordDB();
  db.opDelay = 10;
  db.cryptoDelay = 10;
  const copyToClipboard = spy();
  const store = createFireBitStore(db, {
    copyToClipboard,
  });

  return {
    copyToClipboard,
    store,
    db,
    app: mount(<App passwordDB={db} store={store} />);
  };
}

async function renderLoggedIn() {
  const app = await renderApp();

  app.app.find('input#username').simulate('change', {target: {value: 'username' }});
  app.app.find('input#password').simulate('change', {target: {value: 'password' }});
  app.app.find('form#login').simulate('submit');
  await wait(app.app);

  return app;
}

async function renderSearch(search: string = '__ITEM_123__') {
  const app = await renderLoggedIn();

  app.app.find('input#search').simulate('change', {target: {value: search }});
  await wait(app.app);

  return {...app, item: app.app.find('div#item-list-item-item123')};
}

function wait(app: ReactWrapper<any, any>, delay: number = 20) {
  return new Promise(resolve => setTimeout(resolve, delay))
  .then(() => app.update());
}

it('login with invalid password', async () => {
  const { app } = await renderApp();

  expect(app.find('#login Button').prop('loading')).toBeFalsy();

  app.find('input#username').simulate('change', {target: {value: 'username' }});
  app.find('input#password').simulate('change', {target: {value: 'pass' }});
  app.find('form#login').simulate('submit');

  expect(app.find('#login Button').prop('loading')).toBeTruthy();
  await wait(app);

  expect(app.find('#login Button').prop('loading')).toBeFalsy();

  expect(app.find('form#login').exists()).toBeTruthy();
  expect(app.find('form#login').text()).toContain('Username or password invalid');
});

it('login with valid password', async () => {
  const { app } = await renderApp();

  app.find('input#username').simulate('change', {target: {value: 'username' }});
  app.find('input#password').simulate('change', {target: {value: 'password' }});
  app.find('form#login').simulate('submit');

  await wait(app);

  expect(app.find('form#login').exists()).toBeFalsy();
});

it('search exists', async () => {
  const { app } = await renderLoggedIn();

  expect(app.find('input#search').exists()).toBeTruthy();
});

it('search __UNKNOWN_ITEM__ found nothing', async () => {
  const { app } = await renderSearch('__UNKNOWN_ITEM__');

  expect(app.find('.item-list .item').exists()).toBeFalsy();
});

it('search __ITEM_123__ found an item', async () => {
  const { app, item } = await renderSearch();

  expect(app.find('.item-list .item').length).toBe(1);
  expect(item.exists()).toBeTruthy();
});

it('copy username', async () => {
  const { app, item, copyToClipboard } = await renderSearch();

  item.find('button.copy-username').simulate('click');
  await wait(app);

  expect(copyToClipboard.calledOnce).toBeTruthy();
  expect(copyToClipboard.calledWith('item123 username')).toBeTruthy();
});

it('copy password', async () => {
  const { app, item, copyToClipboard } = await renderSearch();

  item.find('button.copy-password').simulate('click');
  await wait(app);

  expect(copyToClipboard.calledOnce).toBeTruthy();
  expect(copyToClipboard.calledWith('item123 password')).toBeTruthy();
});
