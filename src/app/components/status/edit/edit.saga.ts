import { Router } from '@angular/router';
import { FETCH_STATUSS_REQUESTED } from './../list/list.actions';
import {
  DELETE_STATUS_REQUESTED,
  GET_STATUS_REQUESTED,
  GET_STATUS_SUCCEEDED,
  EDIT_STATUS_REQUESTED,
  RENDER_EDIT_STATUS_FORM_REQUESTED,
  FILL_STATUS_DETAIL_FORM
} from './edit.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* edit(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.status.update(action.data).toPromise();
    router.navigate(['status']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditStatusRequest() {
  yield takeEvery(EDIT_STATUS_REQUESTED, edit);
}

function* getStatus(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.status.getItemById(action.data).toPromise();
    yield put({ type: GET_STATUS_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetStatusRequest() {
  yield takeEvery(GET_STATUS_REQUESTED, getStatus);
}

function* deleteStatus(action) {
  const api = AppInjector.get(ApiService);
  try {
    yield api.status.delete(action.data).toPromise();
    yield put({ type: FETCH_STATUSS_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteStatusRequest() {
  yield takeEvery(DELETE_STATUS_REQUESTED, deleteStatus);
}

function* watchRenderStatusDetailFormRequested() {
  yield takeLatest(RENDER_EDIT_STATUS_FORM_REQUESTED, function*(action: any) {
    yield put({ type: GET_STATUS_REQUESTED, data: action.data.id });
  });
}

function* fillStatusDetailForm(action) {
  yield put({ type: FILL_STATUS_DETAIL_FORM, data: action.data });
}

function* watchFetchStatusDetailSuccessed() {
  yield takeLatest(GET_STATUS_SUCCEEDED, fillStatusDetailForm);
}

export default [watchEditStatusRequest, watchGetStatusRequest, watchDeleteStatusRequest, watchRenderStatusDetailFormRequested, watchFetchStatusDetailSuccessed];
