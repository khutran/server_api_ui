import { FETCH_FRAMEWORKS_SUCCEEDED, FETCH_FRAMEWORKS_REQUESTED, SORT_FRAMEWORKS_REQUESTED, SORT_FRAMEWORKS_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';

function* getFrameworks(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.framework.get(action.data).toPromise();
    yield put({ type: FETCH_FRAMEWORKS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchFrameworksRequest() {
  yield takeEvery(FETCH_FRAMEWORKS_REQUESTED, getFrameworks);
}

export default [
  watchFetchFrameworksRequest
];
