import { Dispatch } from "redux";
import { Action } from "redux";
import { IPasswordDB } from "../passwordDB/index";

export type ThunkParam = IPasswordDB;

export type ActionItem<TPayload, TState> = {
  (params: TPayload): Action;
  readonly symbol: string;
  readonly create: (params: TPayload) => Action;
  readonly dispatch: (dispatch: Dispatch<any>) => (params: TPayload) => void;
  readonly handle: (payload: TPayload, state: TState) => TState;
}

export function defineAction<TState, TPayload>(handle: (payload: TPayload, state: TState) => TState): ActionItem<TPayload, TState> {
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

export function createReducer<TState, T extends Record<string, ActionItem<any, TState>>>(initialState: TState, actions: T) {
  return function reducer(state: TState = initialState, action: Action): TState {
    for (const key in actions) {
      if (actions[key].symbol === action.type) {
        return actions[key].handle((action as any).payload, state);
      }
    }
  
    return state;
  }
}
