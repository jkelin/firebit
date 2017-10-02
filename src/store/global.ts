import { createStore, combineReducers } from "redux";
import { prepareActions, defineAction, createReducer, ThunkParam } from './common';
import { Dispatch } from "redux";
import { RootState } from "./index";
import { Action } from "redux";
import { Item } from "../passwordDB/index";

export type GlobalState = Readonly<{
  isLoggedIn: boolean;
  search: string;
  isSearching?: boolean;
  searchResults?: Item[];
}>

const initialState: GlobalState = {
  isLoggedIn: false,
  search: ''
}

export const GlobalActions = prepareActions({
  SetLoggedIn: defineAction<GlobalState, boolean>((state, isLoggedIn) => ({ ...state, isLoggedIn })),
  SetSearch: defineAction<GlobalState, string>((state, search) => ({ ...state, search })),
  SetSearchResults: defineAction<GlobalState, Item[]>((state, searchResults) => ({ ...state, searchResults })),
  SetIsSearching: defineAction<GlobalState, boolean>((state, isSearching) => ({ ...state, isSearching })),
})

export const GlobalThunks = {
  Login: (username: string, password: string) => async (dispatch: Dispatch<any>, getState: () => RootState, db: ThunkParam) => {
    const res = await db.login(username, password)

    dispatch(GlobalActions.SetLoggedIn(res))
    dispatch(GlobalThunks.Search(''))

    return res
  },
  Search: (what: string) => async (dispatch: Dispatch<any>, getState: () => RootState, db: ThunkParam) => {
    dispatch(GlobalActions.SetIsSearching(true))
    dispatch(GlobalActions.SetSearch(what))
    const res = await db.searchItems(what)
    dispatch(GlobalActions.SetSearchResults(res))
    dispatch(GlobalActions.SetIsSearching(false))
  }
}

export const GlobalReducer = createReducer(initialState, GlobalActions);
