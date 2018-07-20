import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { detail } from './detail/detail.reducer';
import { edit } from './edit/edit.reducer';
import { create } from './create/create.reducer';
export const Product = combineReducers({
  list,
  detail,
  edit,
  create
});
