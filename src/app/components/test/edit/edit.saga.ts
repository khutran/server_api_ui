import { Router } from '@angular/router';
import { FETCH_TESTS_REQUESTED } from './../list/list.actions';
import {
  DELETE_TEST_REQUESTED,
  GET_TEST_REQUESTED,
  GET_TEST_SUCCEEDED,
  EDIT_TEST_REQUESTED,
  RENDER_EDIT_TEST_FORM_REQUESTED,
  FILL_TEST_DETAIL_FORM
} from './edit.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* edit(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.test.update(action.data).toPromise();
    router.navigate(['test']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditTestRequest() {
  yield takeEvery(EDIT_TEST_REQUESTED, edit);
}

function* getTest(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.test.getItemById(action.data).toPromise();
    yield put({ type: GET_TEST_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetTestRequest() {
  yield takeEvery(GET_TEST_REQUESTED, getTest);
}

function* deleteTest(action) {
  const api = AppInjector.get(ApiService);
  try {
    yield api.test.delete(action.data).toPromise();
    yield put({ type: FETCH_TESTS_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteTestRequest() {
  yield takeEvery(DELETE_TEST_REQUESTED, deleteTest);
}

function* watchRenderTestDetailFormRequested() {
  yield takeLatest(RENDER_EDIT_TEST_FORM_REQUESTED, function*(action: any) {
    yield put({ type: GET_TEST_REQUESTED, data: action.data.id });
  });
}

function* fillTestDetailForm(action) {
  yield put({ type: FILL_TEST_DETAIL_FORM, data: action.data });
}

function* watchFetchTestDetailSuccessed() {
  yield takeLatest(GET_TEST_SUCCEEDED, fillTestDetailForm);
}

export default [watchEditTestRequest, watchGetTestRequest, watchDeleteTestRequest, watchRenderTestDetailFormRequested, watchFetchTestDetailSuccessed];
