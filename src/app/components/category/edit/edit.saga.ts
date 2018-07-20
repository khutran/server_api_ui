import { Router } from '@angular/router';
import { FETCH_CATEGORIES_REQUESTED } from './../list/list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put } from 'redux-saga/effects';
import { EDIT_CATEGORY_REQUESTED, EDIT_CATEGORY_SUCCEEDED, DELETE_CATEGORY_REQUESTED, GET_CATEGORY_REQUESTED, GET_CATEGORY_SUCCEEDED } from './edit.actions';

function* updateCategory(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.category.update(action.data).toPromise();
    yield put({ type: EDIT_CATEGORY_SUCCEEDED, data: result });
    router.navigate(['category']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchUpdateCategoryRequest() {
  yield takeEvery(EDIT_CATEGORY_REQUESTED, updateCategory);
}

function* deleteCategory(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.category.delete(action.data).toPromise();
    yield put({ type: FETCH_CATEGORIES_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteCategoryRequest() {
  yield takeEvery(DELETE_CATEGORY_REQUESTED, deleteCategory);
}

function* getCategory(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.category.getItemById(action.data).toPromise();
    yield put({ type: GET_CATEGORY_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetCategoryRequest() {
  yield takeEvery(GET_CATEGORY_REQUESTED, getCategory);
}

export default [
  watchUpdateCategoryRequest,
  watchDeleteCategoryRequest,
  watchGetCategoryRequest,
];
