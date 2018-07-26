import { FETCH_STATUSS_SUCCEEDED, FETCH_STATUSS_REQUESTED, SORT_STATUSS_REQUESTED, SORT_STATUSS_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

function* getStatus(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.status.get(action.data).toPromise();
    yield put({ type: FETCH_STATUSS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchStatusRequest() {
  yield takeLatest(FETCH_STATUSS_REQUESTED, getStatus);
}

export default [watchFetchStatusRequest];
