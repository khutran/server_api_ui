import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_TESTS_SUCCEEDED } from './test.action';
import { EDIT_TEST_SUCCEEDED, DELETE_TEST_SUCCEEDED } from './edit/edit.actions';
import { CREATE_TEST_SUCCEEDED } from './create/create.actions';
const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_TEST_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_TEST_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_TEST_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_TESTS_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const Test = combineReducers({
  list, edit, create, all
});
