import { Dispatch } from 'redux';
import { Action } from 'redux';
import { IPasswordDB } from '../passwordDB/index';

export interface ThunkParam {
  copyToClipboard: (what: string) => void;
  db: IPasswordDB;
}

export interface ActionItem<TState, TPayload> {
  (params: TPayload): Action;
  readonly symbol: string;
  readonly create: (params: TPayload) => Action;
  readonly dispatch: (dispatch: Dispatch<any>) => (params: TPayload) => void;
  readonly handle: (state: TState, payload: TPayload) => TState;
}

// tslint:disable-next-line:ban-types
function defineActionInner<TPayload>(handle: Function, symbol: string) {
  const create = (payload: TPayload) => ({ type: symbol, payload });
  const ret: any = create;

  ret.symbol = symbol;
  ret.create = create;
  ret.handle = handle;
  ret.dispatch = (dispatch: Dispatch<any>) => (payload: TPayload) => dispatch(create(payload));

  return ret;
}

export function defineActionExplicit<TState, TPayload>(handle: (state: TState, payload: TPayload) => TState): ActionItem<TState, TPayload> {
  return defineActionInner.bind(null, handle);
}

export function createActionDefiner<TState>() {
  return function defineAction<TPayload>(handle: (state: TState, payload: TPayload) => TState): ActionItem<TState, TPayload> {
    return defineActionInner.bind(null, handle);
  };
}

function defineShallowActionInner<TPayload>(handle: (state: any, payload: TPayload) => any, symbol: string) {
  const create = (payload: TPayload) => ({ type: symbol, payload });
  const ret: any = create;

  ret.symbol = symbol;
  ret.create = create;
  ret.handle = (state: any, payload: TPayload) => ({ ...state, ...handle(state, payload) });
  ret.dispatch = (dispatch: Dispatch<any>) => (payload: TPayload) => dispatch(create(payload));

  return ret;
}

export function defineShallowActionExplicit<TState, TPayload>(handle: (state: TState, payload: TPayload) => Partial<TState>): ActionItem<TState, TPayload> {
  return defineShallowActionInner.bind(null, handle);
}

export function createShallowActionDefiner<TState>() {
  return function defineShallowAction<TPayload>(handle: (state: TState, payload: TPayload) => Partial<TState>): ActionItem<TState, TPayload> {
    return defineShallowActionInner.bind(null, handle);
  };
}

export function prepareActions<T>(actions: T): T {
  const ret: Partial<T> = {};

  for (const key in actions) {
    ret[key] = (actions[key] as any)(key);
  }

  return ret as T;
}

export function createReducer<TState, T extends Record<string, ActionItem<TState, any>>>(initialState: TState, actions: T) {
  return function reducer(state: TState = initialState, action: Action): TState {
    for (const key in actions) {
      if (actions[key].symbol === action.type) {
        return actions[key].handle(state, (action as any).payload);
      }
    }

    return state;
  };
}
