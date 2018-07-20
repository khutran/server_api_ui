import { Router, ActivatedRoute } from '@angular/router';
import { CUSTOMER_COMP } from './../../customer/customer.const';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put } from 'redux-saga/effects';
import { FETCH_ORDERS_REQUESTED, FETCH_ORDER_SUCCEEDED, SORT_ORDERS_REQUESTED, SORT_ORDERS_SUCCEEDED, UPDATE_ORDER_FILTER } from './list.actions';
import { DELETE_ORDER_REQUESTED } from '../edit/edit.actions';
import * as _ from 'lodash';
import { FETCH_ALL_CUSTOMER_ORDER_SUCCEEDED } from '../../customer/edit/edit.actions';

function* fetchOrders(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.order.get(action.data.pagination, action.data.sorts, action.data.filters).toPromise();
    // console.log(results);
    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case CUSTOMER_COMP:
          yield put({
            type: FETCH_ALL_CUSTOMER_ORDER_SUCCEEDED,
            data: results.items,
            pagination: results.pagination,
            com: action.com
          });
          break;

        default:
          break;
      }
    } else {
      yield put({ type: FETCH_ORDER_SUCCEEDED, data: results.items, pagination: results.pagination });
    }
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchOrdersRequest() {
  yield takeEvery(FETCH_ORDERS_REQUESTED, fetchOrders);
}

function* deleteOrder(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.order.delete(action.data).toPromise();
    AppInjector.get(Router).navigate(['order']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteOrderRequest() {
  yield takeEvery(DELETE_ORDER_REQUESTED, deleteOrder);
}

function* sortOrders(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.order.sort(action.data).toPromise();
    yield put({ type: SORT_ORDERS_SUCCEEDED, data: results.items, total: results.total });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSortOrdersRequest() {
  yield takeEvery(SORT_ORDERS_REQUESTED, sortOrders);
}

function* filterOrder(action) {
  try {
    const activatedRoute = AppInjector.get(ActivatedRoute);
    const router = AppInjector.get(Router);
    const url = activatedRoute.snapshot.url;
    let queryParams = _.assign({}, activatedRoute.snapshot.queryParams, { page: 1 });
    let constraints = {};

    if (action.field === 'shipping_courrier') {
      if (!_.isUndefined(action.data) && action.data !== '') {
        constraints = _.assign(constraints, { shipping_courrier: action.data });
      } else {
        delete constraints['shipping_courrier'];
      }
    }

    if (action.field === 'status') {
      if (!_.isUndefined(action.data) && action.data !== '') {
        constraints = _.assign(constraints, { status: action.data });
      } else {
        delete constraints['status'];
      }
    }

    queryParams = _.assign(queryParams, { constraints: JSON.stringify(constraints) });
    router.navigate([url], { queryParams: queryParams });
  } catch (e) {}
}

function* watchOrderFilterRequest() {
  yield takeEvery(UPDATE_ORDER_FILTER, filterOrder);
}

export default [watchOrderFilterRequest, watchFetchOrdersRequest, watchDeleteOrderRequest, watchSortOrdersRequest];
