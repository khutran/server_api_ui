import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { edit } from './edit/edit.reducer';
import { detail } from './detail/detail.reducer';

export const Order = combineReducers({
  list,
  edit,
  detail
});