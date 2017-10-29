declare module 'clipboard-copy' {
  
}

declare module "redux-router5" {
  import { Router, Plugin, State } from 'router5';
  import { Store, Middleware, Reducer, Dispatch } from 'redux';

  export function router5Middleware(router: Router): Middleware;

  export interface RouterState {

  }

  export const router5Reducer: Reducer<RouterState>;

  export function reduxPlugin<TState extends RouterState>(dispatch: Dispatch<TState>): Plugin;

  // TODO
}

declare module "redux-router5/immutable/reducer" {
  import { Reducer } from 'redux';
  import { RouterState } from 'redux-router5';

  const router5Reducer: Reducer<RouterState>;
  export default router5Reducer;
}
