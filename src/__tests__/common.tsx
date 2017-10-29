import * as React from 'react';
import { MockPasswordDB } from 'passwordDB';
import { createFireBitStore } from 'store';
import { mount, ReactWrapper } from 'enzyme';
import { spy } from 'sinon';
import { App } from 'containers/App';
import { createFireBitRouter } from 'router';

export async function renderApp() {
  const db = new MockPasswordDB();
  db.opDelay = 10;
  db.cryptoDelay = 10;
  const copyToClipboard = spy();
  const router = createFireBitRouter();
  const store = createFireBitStore(db, router, {
    copyToClipboard,
  });

  return {
    copyToClipboard,
    store,
    router,
    db,
    app: mount(<App passwordDB={db} store={store} router={router} />),
  };
}

export async function renderLoggedIn() {
  const app = await renderApp();

  app.app.find('input#username').simulate('change', {target: {value: 'username' }});
  app.app.find('input#password').simulate('change', {target: {value: 'password' }});
  app.app.find('form#login').simulate('submit');
  await wait(app.app);

  return app;
}

export async function renderSearch(search: string = '__ITEM_123__') {
  const app = await renderLoggedIn();

  app.app.find('input#search').simulate('change', {target: {value: search }});
  await wait(app.app);

  return {...app, item: app.app.find('div#item-list-item-item123')};
}

export function wait(app: ReactWrapper<any, any>, delay: number = 20) {
  return new Promise(resolve => setTimeout(resolve, delay))
  .then(() => app.update());
}
