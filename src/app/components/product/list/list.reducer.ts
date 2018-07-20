import * as _ from 'lodash';
import { FETCH_PRODUCTS_SUCCEEDED, SELECT_ALL_PRODUCT, FETCH_PRODUCT_IMAGE_SUCCESSED } from './list.actions';

const Product = (state: any = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_IMAGE_SUCCESSED:
      return _.assign(state, { image: _.find(action.data, item => item.object_id === state.getId()) });
    default:
      return state;
  }
};

export const list = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCEEDED:
      return _.assign({}, state, { fetched: true, items: _.map(action.data, item => _.assign(item, { selected: false })), pagination: action.pagination });

    case SELECT_ALL_PRODUCT:
      return _.assign({}, state, { fetched: true, items: _.map(state.items, item => _.assign(item, { selected: action.selected })), total: action.total });

    case FETCH_PRODUCT_IMAGE_SUCCESSED:
      return _.assign({}, state, { items: _.map(state.items, item => Product(item, action)) });

    default:
      return state;
  }
};
