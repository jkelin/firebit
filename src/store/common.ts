import { Dispatch } from "redux";
import { Action } from "redux";
import { IPasswordDB } from "../passwordDB/index";

export type ThunkParam = IPasswordDB;

export type ActionItem<TState, TPayload> = {
  (params: TPayload): Action;
  readonly symbol: string;
  readonly create: (params: TPayload) => Action;
  readonly dispatch: (dispatch: Dispatch<any>) => (params: TPayload) => void;
  readonly handle: (state: TState, payload: TPayload) => TState;
}

export function defineAction<TState, TPayload>(handle: (state: TState, payload: TPayload) => TState): ActionItem<TState, TPayload> {
  return function(symbol: string) {
    const create = (payload: TPayload) => ({ type: symbol, payload });
    const ret: any = create;

    ret.symbol = symbol;
    ret.create = create;
    ret.handle = handle;
    ret.dispatch = (dispatch: Dispatch<any>) => (payload: TPayload) => dispatch(create(payload));

    return ret;
  } as any;
}

export function prepareActions<T>(actions: T): T {
  const ret: Partial<T> = {};

  for (const key in actions){
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
  }
}
