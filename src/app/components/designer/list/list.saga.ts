import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put } from 'redux-saga/effects';
import { FETCH_DESIGNERS_REQUESTED, FETCH_DESIGNERS_SUCCEEDED, SORT_DESIGNERS_REQUESTED, SORT_DESIGNERS_SUCCEEDED } from './list.actions';
import * as _ from 'lodash';

function* getDesigners(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.designer.get(action.data).toPromise();
    yield put({ type: FETCH_DESIGNERS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchDesignersRequest() {
  yield takeEvery(FETCH_DESIGNERS_REQUESTED, getDesigners);
}

function* sortDesigners(action) {
  const api = AppInjector.get(ApiService);
  try {
  let results = yield api.designer.sort(action.data).toPromise();
  yield put({ type: SORT_DESIGNERS_SUCCEEDED, data: results.items, total: results.total });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSortDesignersRequest() {
  yield takeEvery(SORT_DESIGNERS_REQUESTED, sortDesigners);
}

export default [
  watchFetchDesignersRequest,
  watchSortDesignersRequest,
];
