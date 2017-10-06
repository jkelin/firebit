import { combineReducers, createStore } from "redux";
import { Dispatch } from "redux";
import { Action } from "redux";
import { Item } from "../passwordDB/index";
import { createActionDefiner, createReducer, createShallowActionDefiner, prepareActions, ThunkParam } from "./common";
import { RootState } from "./index";

export type GlobalState = Readonly<{
  isLoggedIn: boolean;
  search: string;
  isSearching?: boolean;
  searchResults?: Item[];
}>;

const initialState: GlobalState = {
  isLoggedIn: false,
  search: "",
};

const defineAction = createActionDefiner<GlobalState>();
const shallowAction = createShallowActionDefiner<GlobalState>();

export const GlobalActions = prepareActions({
  SetLoggedIn: shallowAction<boolean>((state, isLoggedIn) => ({ isLoggedIn })),
  SetSearch: shallowAction<string>((state, search) => ({ search })),
  SetSearchResults: shallowAction<Item[]>((state, searchResults) => ({ searchResults })),
  SetIsSearching: shallowAction<boolean>((state, isSearching) => ({ isSearching })),
});

export const GlobalThunks = {
  Login: (username: string, password: string) => async (dispatch: Dispatch<any>, getState: () => RootState, db: ThunkParam) => {
    const res = await db.login(username, password);

    dispatch(GlobalActions.SetLoggedIn(res));
    dispatch(GlobalThunks.Search(""));

    return res;
  },
  Search: (what: string) => async (dispatch: Dispatch<any>, getState: () => RootState, db: ThunkParam) => {
    dispatch(GlobalActions.SetIsSearching(true));
    dispatch(GlobalActions.SetSearch(what));
    const res = await db.searchItems(what);
    dispatch(GlobalActions.SetSearchResults(res));
    dispatch(GlobalActions.SetIsSearching(false));
  },
};

export const GlobalReducer = createReducer(initialState, GlobalActions);
