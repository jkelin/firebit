import { Store, createStore, combineReducers } from "redux";
import { reducer as formReducer, FormState } from 'redux-form'
import { GlobalState, GlobalReducer } from "./global";
import thunk from 'redux-thunk';
import { applyMiddleware } from "redux";
import { compose } from "redux";
import { IPasswordDB } from "../passwordDB/index";

export interface RootState {
  form: FormState;
  global: GlobalState;
}

const reducers: Record<keyof RootState, any> = {
  form: formReducer,
  global: GlobalReducer
}

export type RootStore = Store<RootState>;

export function createFireBitStore(db: IPasswordDB): RootStore {
  const composeEnhancers = ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  return createStore(
    combineReducers(reducers),
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(db))
    )
  );
}
