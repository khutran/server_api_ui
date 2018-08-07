import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { detail } from './detail/detail.reducer';
import { create } from './create/create.reducer';
import { envedit } from './env/env.reducer';
import { GET_ALL_PROJECTS_SUCCEEDED } from './project.action';
import { EDIT_PROJECT_SUCCEEDED, DELETE_PROJECT_SUCCEEDED } from './edit/edit.actions';
import { CREATE_PROJECT_SUCCEEDED } from './create/create.actions';
const all = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case CREATE_PROJECT_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_PROJECT_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_PROJECT_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_PROJECTS_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const Project = combineReducers({
  list,
  edit,
  detail,
  create,
  all,
  envedit
});
