import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_FRAMEWORKS_SUCCEEDED } from './framework.action';
import { EDIT_FRAMEWORK_SUCCEEDED, DELETE_FRAMEWORK_SUCCEEDED } from './edit/edit.actions';
import { CREATE_FRAMEWORK_SUCCEEDED } from './create/create.actions';
const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_FRAMEWORK_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_FRAMEWORK_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_FRAMEWORK_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_FRAMEWORKS_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const Framework = combineReducers({
  list, edit, create, all
});
