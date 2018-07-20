import { FETCH_CURRENCYS_SUCCEEDED, FETCH_CURRENCYS_REQUESTED, SORT_CURRENCYS_REQUESTED, SORT_CURRENCYS_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';

function* getCurrencys(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.currency.get(action.data).toPromise();
    yield put({ type: FETCH_CURRENCYS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchCurrencysRequest() {
  yield takeEvery(FETCH_CURRENCYS_REQUESTED, getCurrencys);
}

function* sortCurrencys(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.currency.sort(action.data).toPromise();
    yield put({ type: SORT_CURRENCYS_SUCCEEDED, data: results.items, total: results.total });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSortCurrencysRequest() {
  yield takeEvery(SORT_CURRENCYS_REQUESTED, sortCurrencys);
}

export default [
  watchFetchCurrencysRequest,
  watchSortCurrencysRequest,
];
