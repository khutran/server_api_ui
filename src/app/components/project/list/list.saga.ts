import { FETCH_PROJECTS_SUCCEEDED, FETCH_PROJECTS_REQUESTED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { put, takeLatest } from 'redux-saga/effects';

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
  yield takeLatest(FETCH_PROJECTS_REQUESTED, getProjects);
}

export default [watchFetchProjectsRequest];
