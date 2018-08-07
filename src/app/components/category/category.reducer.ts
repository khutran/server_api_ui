import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_CATEGORIES_SUCCEEDED } from './category.action';
import { EDIT_CATEGORY_SUCCEEDED, DELETE_CATEGORY_SUCCEEDED } from './edit/edit.actions';
import { CREATE_CATEGORY_SUCCEEDED } from './create/create.actions';
const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_CATEGORY_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_CATEGORY_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_CATEGORIES_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const Category = combineReducers({
  list, edit, create, all
});
