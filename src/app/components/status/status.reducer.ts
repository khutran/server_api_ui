import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_STATUSS_SUCCEEDED } from './status.action';
import { EDIT_STATUS_SUCCEEDED, DELETE_STATUS_SUCCEEDED } from './edit/edit.actions';
import { CREATE_STATUS_SUCCEEDED } from './create/create.actions';
const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_STATUS_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_STATUS_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_STATUS_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_STATUSS_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const Status = combineReducers({
  list, edit, create, all
});
