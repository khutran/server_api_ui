import { AppInjector } from './../../../app-injector';
import { API_CALL_ERROR } from './../../../store/action';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { FETCH_CUSTOMERS_REQUESTED, FETCH_CUSTOMERS_SUCCEEDED, SORT_CUSTOMERS_SUCCEEDED, SORT_CUSTOMERS_REQUESTED } from './list.actions';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';

function* fetchCustomers(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.user.get(action.data).toPromise();
    yield put({ type: FETCH_CUSTOMERS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchCustomerRequest() {
  yield takeEvery(FETCH_CUSTOMERS_REQUESTED, fetchCustomers);
}

function* sortCustomers(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.customer.sort(action.data).toPromise();
    yield put({ type: SORT_CUSTOMERS_SUCCEEDED, data: results.items, total: results.total });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSortCustomersRequest() {
  yield takeEvery(SORT_CUSTOMERS_REQUESTED, sortCustomers);
}

export default [watchFetchCustomerRequest, watchSortCustomersRequest];
