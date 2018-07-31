import { Router } from '@angular/router';
import { FETCH_SERVERS_REQUESTED } from './../list/list.actions';
import {
  DELETE_SERVER_REQUESTED,
  GET_SERVER_REQUESTED,
  GET_SERVER_SUCCEEDED,
  EDIT_SERVER_REQUESTED,
  RENDER_EDIT_SERVER_FORM_REQUESTED,
  FILL_SERVER_DETAIL_FORM
} from './edit.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* edit(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.server.update(action.data).toPromise();
    router.navigate(['servers']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditServerRequest() {
  yield takeEvery(EDIT_SERVER_REQUESTED, edit);
}

function* getServer(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.server.getItemById(action.data).toPromise();
    yield put({ type: GET_SERVER_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetServerRequest() {
  yield takeEvery(GET_SERVER_REQUESTED, getServer);
}

function* deleteServer(action) {
  const api = AppInjector.get(ApiService);
  try {
    yield api.server.delete(action.data).toPromise();
    yield put({ type: FETCH_SERVERS_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteServerRequest() {
  yield takeEvery(DELETE_SERVER_REQUESTED, deleteServer);
}

function* watchRenderServerDetailFormRequested() {
  yield takeLatest(RENDER_EDIT_SERVER_FORM_REQUESTED, function*(action: any) {
    yield put({ type: GET_SERVER_REQUESTED, data: action.data.id });
  });
}

function* fillServerDetailForm(action) {
  yield put({ type: FILL_SERVER_DETAIL_FORM, data: action.data });
}

function* watchFetchServerDetailSuccessed() {
  yield takeLatest(GET_SERVER_SUCCEEDED, fillServerDetailForm);
}

export default [watchEditServerRequest, watchGetServerRequest, watchDeleteServerRequest, watchRenderServerDetailFormRequested, watchFetchServerDetailSuccessed];
