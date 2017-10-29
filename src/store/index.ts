import { combineReducers, createStore, Store } from 'redux';
import { applyMiddleware } from 'redux';
import { compose } from 'redux';
import { FormState, reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { IPasswordDB } from '../passwordDB/index';
import { GlobalReducer, GlobalState } from './global';
import * as copy from 'clipboard-copy';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { Reducer } from 'redux';
import { Router } from 'router5';

export interface RootState {
  router: any;
  form: FormState;
  global: GlobalState;
}

const reducers: Record<keyof RootState, Reducer<any>> = {
  router: router5Reducer,
  form: formReducer,
  global: GlobalReducer,
};

export type RootStore = Store<RootState>;

export function createFireBitStore(db: IPasswordDB, router: Router, opts: { copyToClipboard?: (data: string) => void } = {}): RootStore {
  const composeEnhancers = ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  return createStore(
    combineReducers(reducers),
    composeEnhancers(
      applyMiddleware(
        thunk.withExtraArgument({
          copyToClipboard: opts.copyToClipboard || copy,
          db,
        }),
        router5Middleware(router),
      ),
    ),
  );
}
