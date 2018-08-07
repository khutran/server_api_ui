import { Router } from '@angular/router';
import { FETCH_FRAMEWORKS_REQUESTED } from './../list/list.actions';
import {
  DELETE_FRAMEWORK_REQUESTED,
  GET_FRAMEWORK_REQUESTED,
  GET_FRAMEWORK_SUCCEEDED,
  EDIT_FRAMEWORK_REQUESTED,
  RENDER_EDIT_FRAMEWORK_FORM_REQUESTED,
  FILL_FRAMEWORK_DETAIL_FORM
} from './edit.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* edit(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.framework.update(action.data).toPromise();
    router.navigate(['frameworks']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditFrameworkRequest() {
  yield takeEvery(EDIT_FRAMEWORK_REQUESTED, edit);
}

function* getFramework(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.framework.getItemById(action.data).toPromise();
    yield put({ type: GET_FRAMEWORK_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetFrameworkRequest() {
  yield takeEvery(GET_FRAMEWORK_REQUESTED, getFramework);
}

function* deleteFramework(action) {
  const api = AppInjector.get(ApiService);
  try {
    yield api.framework.delete(action.data).toPromise();
    yield put({ type: FETCH_FRAMEWORKS_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteFrameworkRequest() {
  yield takeEvery(DELETE_FRAMEWORK_REQUESTED, deleteFramework);
}

function* watchRenderFrameworkDetailFormRequested() {
  yield takeLatest(RENDER_EDIT_FRAMEWORK_FORM_REQUESTED, function*(action: any) {
    yield put({ type: GET_FRAMEWORK_REQUESTED, data: action.data.id });
  });
}

function* fillFrameworkDetailForm(action) {
  yield put({ type: FILL_FRAMEWORK_DETAIL_FORM, data: action.data });
}

function* watchFetchFrameworkDetailSuccessed() {
  yield takeLatest(GET_FRAMEWORK_SUCCEEDED, fillFrameworkDetailForm);
}

export default [watchEditFrameworkRequest, watchGetFrameworkRequest, watchDeleteFrameworkRequest, watchRenderFrameworkDetailFormRequested, watchFetchFrameworkDetailSuccessed];
