import * as React from 'react';
import { MockPasswordDB } from 'passwordDB';
import { createFireBitStore } from 'store';
import { App } from 'containers/App';

import { mount } from 'enzyme';

function renderApp() {
  const db = new MockPasswordDB();
  db.opDelay = 10;
  db.cryptoDelay = 10;
  const store = createFireBitStore(db);

  return mount(<App passwordDB={db} store={store} />);
}

function wait(delay: number = 20) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

it('login with invalid password', async () => {
  const app = renderApp();

  app.find('#username').first().simulate('change', {target: {value: 'username' }});
  app.find('#password').first().simulate('change', {target: {value: 'pass' }});
  app.find('#login').first().simulate('submit');

  await wait();

  expect(app.text()).toContain('Username or password invalid');
});

it('login with valid password', async () => {
  const app = renderApp();

  app.find('#username').first().simulate('change', {target: {value: 'username' }});
  app.find('#password').first().simulate('change', {target: {value: 'password' }});
  app.find('#login').first().simulate('submit');

  await wait();

  expect(app.text()).not.toContain('Username or password invalid');
});
