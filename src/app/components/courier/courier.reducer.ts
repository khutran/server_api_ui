import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
import { GET_ALL_COURIERS_SUCCEEDED } from './courier.action';
import { EDIT_COURIER_SUCCEEDED, DELETE_COURIER_SUCCEEDED } from './edit/edit.actions';
import { CREATE_COURIER_SUCCEEDED } from './create/create.actions';
const all = (state = { fetched: false, items: []}, action) => {
  switch (action.type) {
    case CREATE_COURIER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case EDIT_COURIER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case DELETE_COURIER_SUCCEEDED:
      return {
        fetched: false,
        items: [...state.items]
      };
    case GET_ALL_COURIERS_SUCCEEDED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const Courier = combineReducers({
  list, edit, create, all
});
