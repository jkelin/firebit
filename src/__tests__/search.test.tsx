import * as React from 'react';
import { renderApp, wait, renderLoggedIn, renderSearch } from '__tests__/common';

it('search exists', async () => {
  const { app } = await renderLoggedIn();

  expect(app.find('input#search').exists()).toBe(true);
});

it('search __UNKNOWN_ITEM__ found nothing', async () => {
  const { app } = await renderSearch('__UNKNOWN_ITEM__');

  expect(app.find('.item-list .item').exists()).toBe(false);
});

it('search __ITEM_123__ found an item', async () => {
  const { app, item } = await renderSearch();

  expect(app.find('.item-list .item').length).toBe(1);
  expect(item.exists()).toBe(true);
});

it('copy username', async () => {
  const { app, item, copyToClipboard } = await renderSearch();

  item.find('button.copy-username').simulate('click');
  await wait(app);

  expect(copyToClipboard.calledOnce).toBe(true);
  expect(copyToClipboard.calledWith('item123 username')).toBe(true);
});

it('copy password', async () => {
  const { app, item, copyToClipboard } = await renderSearch();

  item.find('button.copy-password').simulate('click');
  await wait(app);

  expect(copyToClipboard.calledOnce).toBe(true);
  expect(copyToClipboard.calledWith('item123 password')).toBe(true);
});

it('open url', async () => {
  const { app, item } = await renderSearch();

  expect(item.find('a.open-url').prop('href')).toBe('http://example.com');
});
