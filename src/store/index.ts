import { Store, createStore, combineReducers } from "redux";
import { reducer as formReducer, FormState } from 'redux-form'
import { GlobalState, GlobalReducer } from "./global";

export interface RootState {
  form: FormState;
  global: GlobalState;
}

const reducers: Record<keyof RootState, any> = {
  form: formReducer,
  global: GlobalReducer
}

export type RootStore = Store<RootState>;

export function createFireBitStore(): RootStore {
  const devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

  return createStore(
    combineReducers(reducers),
    devtools && devtools()
  );
}
