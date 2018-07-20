import _ from 'lodash';
import { combineReducers } from 'redux';
import { Auth } from '../components/auth/auth.reducer';
import { Product } from '../components/product/product.reducer';
import { Customer } from '../components/customer/customer.reducer';
import { Order } from '../components/order/order.reducer';
import { Category } from '../components/category/category.reducer';
import { Designer } from './../components/designer/designer.reducer';
import { Currency } from './../components/currency/currency.reducer';
import { Courier } from './../components/courier/courier.reducer';
import { Acl } from './../components/acl/acl.reducer';
import { Users } from './../components/user/user.reducer';
import { Constant } from './constant/constant.reducer';
import { environment } from '../../environments/environment';
import { Provider } from './../components/provider/provider.reducer';
import { Print } from './print/print.reducer';
import { Profile } from '../components/profile/profile.reducer';

const RootReducer = (state = { config: environment }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  RootReducer,
  Auth,
  Product,
  Customer,
  Order,
  Designer,
  Category,
  Acl,
  Users,
  Constant,
  Provider,
  Print,
  Currency,
  Courier,
  Profile
});
