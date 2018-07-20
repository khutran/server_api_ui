import * as _ from 'lodash';
import { FETCH_PRODUCT_DETAIL_SUCCEEDED, MAP_CATEGORIES_TO_PRODUCT, FETCH_PRODUCT_DETAIL_REQUESTED } from './detail.actions';

export const detail = (state = { fetched: false, data: {} }, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAIL_SUCCEEDED:
      return _.assign({}, state, { fetched: true, data: action.data });

    case FETCH_PRODUCT_DETAIL_REQUESTED:
      return _.assign({}, state, { fetched: false, data: {} });

    case MAP_CATEGORIES_TO_PRODUCT:
      return _.assign({}, { data: _.assign(state.data, { categories: action.data }) });

    default:
      return state;
  }
};
