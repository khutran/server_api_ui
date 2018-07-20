import { FETCH_COURIERS_SUCCEEDED, FETCH_COURIERS_REQUESTED, SORT_COURIERS_REQUESTED, SORT_COURIERS_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';

function* getCouriers(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.courier.get(action.data).toPromise();
    yield put({ type: FETCH_COURIERS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchCouriersRequest() {
  yield takeEvery(FETCH_COURIERS_REQUESTED, getCouriers);
}

function* sortCouriers(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.courier.sort(action.data).toPromise();
    yield put({ type: SORT_COURIERS_SUCCEEDED, data: results.items, total: results.total });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSortCouriersRequest() {
  yield takeEvery(SORT_COURIERS_REQUESTED, sortCouriers);
}

export default [
  watchFetchCouriersRequest,
  watchSortCouriersRequest,
];
