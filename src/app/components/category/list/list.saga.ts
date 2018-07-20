import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put } from 'redux-saga/effects';
import {
  FETCH_CATEGORIES_REQUESTED,
  FETCH_CATEGORIES_SUCCEEDED,
  FETCH_NESTED_CATEGORIES_REQUESTED,
  FETCH_NESTED_CATEGORIES_SUCCEEDED,
  SORT_CATEGORIES_REQUESTED,
  SORT_CATEGORIES_SUCCEEDED
} from './list.actions';
import * as _ from 'lodash';

function* getCategories(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.category.get(action.data).toPromise();
    yield put({ type: FETCH_CATEGORIES_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchCategoriesRequest() {
  yield takeEvery(FETCH_CATEGORIES_REQUESTED, getCategories);
}

function* sortCategories(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.category.sort(action.data).toPromise();
    yield put({ type: SORT_CATEGORIES_SUCCEEDED, data: results.items, total: results.total });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSortCategoriesRequest() {
  yield takeEvery(SORT_CATEGORIES_REQUESTED, sortCategories);
}

export default [watchFetchCategoriesRequest, watchSortCategoriesRequest];
