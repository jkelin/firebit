import { combineReducers, createStore } from 'redux';
import { Dispatch } from 'redux';
import { Action } from 'redux';
import { SearchItem, ItemId } from '../passwordDB/index';
import { createActionDefiner, createReducer, createShallowActionDefiner, prepareActions, ThunkParam } from './common';
import { RootState } from './index';

export type GlobalState = Readonly<{
  isLoggedIn: boolean;
  search: string;
  isSearching?: boolean;
  searchResults?: SearchItem[];
}>;

const initialState: GlobalState = {
  isLoggedIn: false,
  search: '',
};

const defineAction = createActionDefiner<GlobalState>();
const shallowAction = createShallowActionDefiner<GlobalState>();

export const GlobalActions = prepareActions({
  SetLoggedIn: shallowAction<boolean>((state, isLoggedIn) => ({ isLoggedIn })),
  SetSearch: shallowAction<string>((state, search) => ({ search })),
  SetSearchResults: shallowAction<SearchItem[]>((state, searchResults) => ({ searchResults })),
  SetIsSearching: shallowAction<boolean>((state, isSearching) => ({ isSearching })),
});

export const GlobalThunks = {
  Login: (username: string, password: string) => async (dispatch: Dispatch<any>, getState: () => RootState, thunk: ThunkParam) => {
    const res = await thunk.db.login(username, password);

    dispatch(GlobalActions.SetLoggedIn(res));
    dispatch(GlobalThunks.Search(''));

    return res;
  },
  Search: (what: string) => async (dispatch: Dispatch<any>, getState: () => RootState, thunk: ThunkParam) => {
    dispatch(GlobalActions.SetIsSearching(true));
    dispatch(GlobalActions.SetSearch(what));
    const res = await thunk.db.searchItems(what);
    dispatch(GlobalActions.SetSearchResults(res));
    dispatch(GlobalActions.SetIsSearching(false));
  },
  CopyToClipboard: (itemId: ItemId, selector: { key: string }) => async (dispatch: Dispatch<any>, getState: () => RootState, thunk: ThunkParam) => {
    if (!selector.key) {
      throw new Error('Selector.key is required');
    }

    const res = await thunk.db.readItemFieldValueByKey(itemId, selector.key);
    thunk.copyToClipboard(res);
  },
};

export const GlobalReducer = createReducer(initialState, GlobalActions);
