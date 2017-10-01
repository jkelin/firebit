import { createStore, combineReducers } from "redux";
import { makeAction } from './common';

export const GlobalActions = {
  SetLoggedIn: makeAction('SET_LOGGED_IN', undefined as any as { isLoggedIn: boolean }),
  SetSearch: makeAction('SET_SEARCH', undefined as any as { search?: string }),
};

export type GlobalAction = (typeof GlobalActions)[keyof (typeof GlobalActions)];

export type GlobalState = Readonly<{
  isLoggedIn?: boolean;
  search?: string;
}>

const initialState: GlobalState = {}

export function GlobalReducer(state: GlobalState = initialState, action: GlobalAction): GlobalState {
  if (action.type === GlobalActions.SetLoggedIn.type) {
    return { ...state, isLoggedIn: action.payload.isLoggedIn}
  }

  if (action.type === GlobalActions.SetSearch.type) {
    return { ...state, search: action.payload.search}
  }

  return state;
}
