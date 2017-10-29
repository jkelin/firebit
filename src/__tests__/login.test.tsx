import * as React from 'react';
import { renderApp, wait, renderLoggedIn, renderSearch } from '__tests__/common';

it('login with invalid password', async () => {
  const { app } = await renderApp();

  expect(app.find('#login Button').prop('loading')).toBe(false);

  app.find('input#username').simulate('change', {target: {value: 'username' }});
  app.find('input#password').simulate('change', {target: {value: 'pass' }});
  app.find('form#login').simulate('submit');

  expect(app.find('#login Button').prop('loading')).toBe(true);
  await wait(app);

  expect(app.find('#login Button').prop('loading')).toBe(false);

  expect(app.find('form#login').exists()).toBe(true);
  expect(app.find('form#login').text()).toContain('Username or password invalid');
});

it('login with valid password', async () => {
  const { app } = await renderApp();

  app.find('input#username').simulate('change', {target: {value: 'username' }});
  app.find('input#password').simulate('change', {target: {value: 'password' }});
  app.find('form#login').simulate('submit');

  await wait(app);

  expect(app.find('form#login').exists()).toBe(false);
});
