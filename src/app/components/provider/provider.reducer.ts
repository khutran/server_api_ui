import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_PROVIDERS_SUCCEEDED } from './provider.actions';
import { EDIT_PROVIDER_SUCCEEDED, DELETE_PROVIDER_SUCCEEDED } from './edit/edit.actions';
import { CREATE_PROVIDER_SUCCEEDED } from './create/create.actions';

const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_PROVIDER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_PROVIDER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_PROVIDER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_PROVIDERS_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};

export const Provider = combineReducers({
  list, edit, create, all
});
