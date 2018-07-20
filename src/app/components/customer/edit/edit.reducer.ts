import {
  CREATE_CUSTOMER_ADDRESS_SUCCEEDED,
  FETCH_CUSTOMER_DETAIL_SUCCEEDED,
  FETCH_CUSTOMER_ADDRESSES_SUCCEEDED,
  DELETE_CUSTOMER_ADDRESS_SUCCEEDED,
  UPDATE_CUSTOMER_ADDRESS_SUCCEEDED,
  UPDATE_CUSTOMER_SUCCEEDED,
  SET_DEFAULT_ADDRESS_SUCCEEDED,
  FETCH_ALL_CUSTOMER_ORDER_SUCCEEDED
} from './edit.actions';
import * as _ from 'lodash';

export const edit = (
  state = {
    updated: false,
    fetched: false,
    deleted: false,
    addressUpdated: false,
    item: {},
    address: {},
    addresses: [],
    orders: {
      fetched: false,
      items: [],
      pagination: null
    }
  },
  action
) => {
  switch (action.type) {
    case CREATE_CUSTOMER_ADDRESS_SUCCEEDED:
      return _.assign({}, state, {
        address: action.data,
        fetched: false,
        addresses: [...state.addresses, action.data]
      });

    case FETCH_CUSTOMER_DETAIL_SUCCEEDED:
      return _.assign({}, state, { fetched: true, item: action.data });

    case FETCH_CUSTOMER_ADDRESSES_SUCCEEDED:
      return _.assign({}, state, {
        fetched: true,
        addresses: _.map(action.data, item => {
          return _.assign(item, { phone: { code: item.phone_code, value: item.phone } });
        })
      });

    case UPDATE_CUSTOMER_ADDRESS_SUCCEEDED:
      return _.assign({}, state, { addressUpdated: true });

    case UPDATE_CUSTOMER_SUCCEEDED:
      return _.assign({}, state, { customerUpdated: true, data: action.data });

    case SET_DEFAULT_ADDRESS_SUCCEEDED:
      return _.assign({}, state, {
        addresses: state.addresses.map(item => (item.id === action.data.id ? _.assign({}, item, { is_default: 1 }) : _.assign({}, item, { is_default: 0 })))
      });

    case DELETE_CUSTOMER_ADDRESS_SUCCEEDED:
      return _.assign({}, state, {
        addresses: _.pull([...state.addresses], action.data)
      });

    case FETCH_ALL_CUSTOMER_ORDER_SUCCEEDED:
      return _.assign({}, state, {
        orders: _.assign(
          {},
          {
            fetched: true,
            items: action.data,
            pagination: action.pagination
          }
        )
      });

    default:
      return state;
  }
};
