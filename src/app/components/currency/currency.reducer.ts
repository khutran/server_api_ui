import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_CURRENCYS_SUCCEEDED } from './currency.actions';
import { EDIT_CURRENCY_SUCCEEDED, DELETE_CURRENCY_SUCCEEDED } from './edit/edit.actions';
import { CREATE_CURRENCY_SUCCEEDED } from './create/create.actions';

const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_CURRENCY_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_CURRENCY_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_CURRENCY_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_CURRENCYS_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const Currency = combineReducers({
  list, edit, create, all
});
