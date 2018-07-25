import { Router } from '@angular/router';
import { FETCH_<%= underscore(name).toUpperCase() %>S_REQUESTED } from './../list/list.actions';
import {
  DELETE_<%= underscore(name).toUpperCase() %>_REQUESTED,
  GET_<%= underscore(name).toUpperCase() %>_REQUESTED,
  GET_<%= underscore(name).toUpperCase() %>_SUCCEEDED,
  EDIT_<%= underscore(name).toUpperCase() %>_REQUESTED,
  RENDER_EDIT_<%= underscore(name).toUpperCase() %>_FORM_REQUESTED,
  FILL_<%= underscore(name).toUpperCase() %>_DETAIL_FORM
} from './edit.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* edit(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.<%= camelize(name) %>.update(action.data).toPromise();
    router.navigate(['<%= camelize(name) %>']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEdit<%= dasherize(name).toUpperCase() %>Request() {
  yield takeEvery(EDIT_<%= underscore(name).toUpperCase() %>_REQUESTED, edit);
}

function* get<%= dasherize(name).toUpperCase() %>(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.<%= camelize(name) %>.getItemById(action.data).toPromise();
    yield put({ type: GET_<%= underscore(name).toUpperCase() %>_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGet<%= dasherize(name).toUpperCase() %>Request() {
  yield takeEvery(GET_<%= underscore(name).toUpperCase() %>_REQUESTED, get<%= dasherize(name).toUpperCase() %>);
}

function* delete<%= dasherize(name).toUpperCase() %>(action) {
  const api = AppInjector.get(ApiService);
  try {
    yield api.<%= camelize(name) %>.delete(action.data).toPromise();
    yield put({ type: FETCH_<%= underscore(name).toUpperCase() %>S_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDelete<%= dasherize(name).toUpperCase() %>Request() {
  yield takeEvery(DELETE_<%= underscore(name).toUpperCase() %>_REQUESTED, delete<%= dasherize(name).toUpperCase() %>);
}

function* watchRender<%= dasherize(name).toUpperCase() %>DetailFormRequested() {
  yield takeLatest(RENDER_EDIT_<%= underscore(name).toUpperCase() %>_FORM_REQUESTED, function*(action: any) {
    yield put({ type: GET_<%= underscore(name).toUpperCase() %>_REQUESTED, data: action.data.id });
  });
}

function* fill<%= dasherize(name).toUpperCase() %>DetailForm(action) {
  yield put({ type: FILL_<%= underscore(name).toUpperCase() %>_DETAIL_FORM, data: action.data });
}

function* watchFetch<%= dasherize(name).toUpperCase() %>DetailSuccessed() {
  yield takeLatest(GET_<%= underscore(name).toUpperCase() %>_SUCCEEDED, fill<%= dasherize(name).toUpperCase() %>DetailForm);
}

export default [watchEdit<%= dasherize(name).toUpperCase() %>Request, watchGet<%= dasherize(name).toUpperCase() %>Request, watchDelete<%= dasherize(name).toUpperCase() %>Request, watchRender<%= dasherize(name).toUpperCase() %>DetailFormRequested, watchFetch<%= dasherize(name).toUpperCase() %>DetailSuccessed];
