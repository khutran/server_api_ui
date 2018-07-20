import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_DESIGNERS_SUCCEEDED } from './designer.actions';
import { EDIT_DESIGNER_SUCCEEDED, DELETE_DESIGNER_SUCCEEDED } from './edit/edit.actions';
import { CREATE_DESIGNER_SUCCEEDED } from './create/create.actions';

const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_DESIGNER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_DESIGNER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_DESIGNER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_DESIGNERS_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};

export const Designer = combineReducers({
  list, edit, create, all
});
