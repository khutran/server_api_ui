import { Router } from '@angular/router';
import { FETCH_CATEGORIES_REQUESTED } from './../list/list.actions';
import {
  DELETE_CATEGORY_REQUESTED,
  GET_CATEGORY_REQUESTED,
  GET_CATEGORY_SUCCEEDED,
  EDIT_CATEGORY_REQUESTED,
  RENDER_EDIT_CATEGORY_FORM_REQUESTED,
  FILL_CATEGORY_DETAIL_FORM
} from './edit.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* edit(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.category.update(action.data).toPromise();
    router.navigate(['categories']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditCategoryRequest() {
  yield takeEvery(EDIT_CATEGORY_REQUESTED, edit);
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

function* deleteCategory(action) {
  const api = AppInjector.get(ApiService);
  try {
    yield api.category.delete(action.data).toPromise();
    yield put({ type: FETCH_CATEGORIES_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteCategoryRequest() {
  yield takeEvery(DELETE_CATEGORY_REQUESTED, deleteCategory);
}

function* watchRenderCategoryDetailFormRequested() {
  yield takeLatest(RENDER_EDIT_CATEGORY_FORM_REQUESTED, function*(action: any) {
    yield put({ type: GET_CATEGORY_REQUESTED, data: action.data.id });
  });
}

function* fillCategoryDetailForm(action) {
  yield put({ type: FILL_CATEGORY_DETAIL_FORM, data: action.data });
}

function* watchFetchCategoryDetailSuccessed() {
  yield takeLatest(GET_CATEGORY_SUCCEEDED, fillCategoryDetailForm);
}

export default [watchEditCategoryRequest, watchGetCategoryRequest, watchDeleteCategoryRequest, watchRenderCategoryDetailFormRequested, watchFetchCategoryDetailSuccessed];
