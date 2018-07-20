import { Router } from '@angular/router';
import { FETCH_<%= underscore(name).toUpperCase() %>S_REQUESTED } from './../list/list.actions';
import { DELETE_<%= underscore(name).toUpperCase() %>_REQUESTED, GET_<%= underscore(name).toUpperCase() %>_REQUESTED, GET_<%= underscore(name).toUpperCase() %>_SUCCEEDED, EDIT_<%= underscore(name).toUpperCase() %>_REQUESTED } from './edit.actions';
import { takeEvery, put } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* edit<%= classify(name) %>(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.<%= camelize(name) %>.update(action.data).toPromise();
    router.navigate(['<%= dasherize(name) %>']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEdit<%= classify(name) %>Request() {
  yield takeEvery(EDIT_<%= dasherize(name).toUpperCase() %>_REQUESTED, edit<%= classify(name) %>);
}

function* get<%= classify(name) %>(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.<%= camelize(name) %>.getItemById(action.data).toPromise();
    yield put({ type: GET_<%= dasherize(name).toUpperCase() %>_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGet<%= classify(name) %>Request() {
  yield takeEvery(GET_<%= dasherize(name).toUpperCase() %>_REQUESTED, get<%= classify(name) %>);
}

function* delete<%= classify(name) %>(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.<%= camelize(name) %>.delete(action.data).toPromise();
    yield put({ type: FETCH_<%= dasherize(name).toUpperCase() %>S_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDelete<%= classify(name) %>Request() {
  yield takeEvery(DELETE_<%= dasherize(name).toUpperCase() %>_REQUESTED, delete<%= classify(name) %>);
}

export default [watchEdit<%= classify(name) %>Request, watchGet<%= classify(name) %>Request, watchDelete<%= classify(name) %>Request];
