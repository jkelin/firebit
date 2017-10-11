import { combineReducers, createStore, Store } from 'redux';
import { applyMiddleware } from 'redux';
import { compose } from 'redux';
import { FormState, reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { IPasswordDB } from '../passwordDB/index';
import { GlobalReducer, GlobalState } from './global';
import * as copyToClipboard from 'clipboard-copy';

export interface RootState {
  form: FormState;
  global: GlobalState;
}

const reducers: Record<keyof RootState, any> = {
  form: formReducer,
  global: GlobalReducer,
};

export type RootStore = Store<RootState>;

export function createFireBitStore(db: IPasswordDB): RootStore {
  const composeEnhancers = ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  return createStore(
    combineReducers(reducers),
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({
        copyToClipboard,
        db,
      })),
    ),
  );
}
