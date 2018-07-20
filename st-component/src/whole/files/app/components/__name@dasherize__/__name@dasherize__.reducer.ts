import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_<%= underscore(name).toUpperCase() %>S_SUCCEEDED } from './<%= dasherize(name) %>.action';
import { EDIT_<%= underscore(name).toUpperCase() %>_SUCCEEDED, DELETE_<%= underscore(name).toUpperCase() %>_SUCCEEDED } from './edit/edit.actions';
import { CREATE_<%= underscore(name).toUpperCase() %>_SUCCEEDED } from './create/create.actions';
const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_<%= underscore(name).toUpperCase() %>_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_<%= underscore(name).toUpperCase() %>_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_<%= underscore(name).toUpperCase() %>_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_<%= underscore(name).toUpperCase() %>S_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const <%= classify(name) %> = combineReducers({
  list, edit, create, all
});
