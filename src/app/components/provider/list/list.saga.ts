import { FETCH_PROVIDERS_SUCCEEDED, FETCH_PROVIDERS_REQUESTED, SORT_PROVIDERS_REQUESTED, SORT_PROVIDERS_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';

function* getProviders(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.provider.get(action.data).toPromise();
    yield put({ type: FETCH_PROVIDERS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchProvidersRequest() {
  yield takeEvery(FETCH_PROVIDERS_REQUESTED, getProviders);
}

function* sortProviders(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.provider.sort(action.data).toPromise();
    yield put({ type: SORT_PROVIDERS_SUCCEEDED, data: results.items, total: results.total });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSortProvidersRequest() {
  yield takeEvery(SORT_PROVIDERS_REQUESTED, sortProviders);
}

export default [
  watchFetchProvidersRequest,
  watchSortProvidersRequest,
];
