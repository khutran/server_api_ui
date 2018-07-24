import { FETCH_PROJECTS_SUCCEEDED, FETCH_PROJECTS_REQUESTED, SORT_PROJECTS_REQUESTED, SORT_PROJECTS_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';

function* getProjects(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.project.get(action.data).toPromise();
    yield put({ type: FETCH_PROJECTS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchProjectsRequest() {
  yield takeEvery(FETCH_PROJECTS_REQUESTED, getProjects);
}

function* sortProjects(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.project.sort(action.data).toPromise();
    yield put({ type: SORT_PROJECTS_SUCCEEDED, data: results.items, total: results.total });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSortProjectsRequest() {
  yield takeEvery(SORT_PROJECTS_REQUESTED, sortProjects);
}

export default [
  watchFetchProjectsRequest,
  watchSortProjectsRequest,
];
