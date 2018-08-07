import { FETCH_CATEGORIES_SUCCEEDED, FETCH_CATEGORIES_REQUESTED, SORT_CATEGORIES_REQUESTED, SORT_CATEGORIES_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';

function* getCategorys(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.category.get(action.data).toPromise();
    yield put({ type: FETCH_CATEGORIES_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchCategorysRequest() {
  yield takeEvery(FETCH_CATEGORIES_REQUESTED, getCategorys);
}

export default [
  watchFetchCategorysRequest
];
