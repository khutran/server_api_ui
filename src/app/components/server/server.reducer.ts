import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_SERVERS_SUCCEEDED } from './server.action';
import { EDIT_SERVER_SUCCEEDED, DELETE_SERVER_SUCCEEDED } from './edit/edit.actions';
import { CREATE_SERVER_SUCCEEDED } from './create/create.actions';
const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_SERVER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_SERVER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_SERVER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_SERVERS_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const Server = combineReducers({
  list, edit, create, all
});
