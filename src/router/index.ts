import { ItemId } from 'passwordDB';
import { createRouter, loggerPlugin, Route } from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';

export const routes: Route[] = [
  { name: 'root', path: '/' },
  { name: 'item', path: '/item/:itemId' },
];

export interface ListRoute { name: 'list'; }
export interface ItemRoute { name: 'list.item'; itemId: ItemId; }

export type CustomRoute = ListRoute | ItemRoute;

export const createFireBitRouter = () =>
  createRouter(routes, { defaultRoute: 'list' })
  .usePlugin(loggerPlugin)
  .usePlugin(browserPlugin({
    useHash: true,
  }))
  .usePlugin(listenersPlugin());
