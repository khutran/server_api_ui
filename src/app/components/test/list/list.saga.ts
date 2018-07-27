import { FETCH_TESTS_SUCCEEDED, FETCH_TESTS_REQUESTED, SORT_TESTS_REQUESTED, SORT_TESTS_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';

function* getTests(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.test.get(action.data).toPromise();
    yield put({ type: FETCH_TESTS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchTestsRequest() {
  yield takeEvery(FETCH_TESTS_REQUESTED, getTests);
}

export default [
  watchFetchTestsRequest
];
