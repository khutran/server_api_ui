import { FETCH_PROJECTS_SUCCEEDED, FETCH_PROJECTS_REQUESTED, BUILD_PROJECT_REQUESTED, BUILD_PROJECT_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import { NotificationService } from '../../../common/services/notification/notification.service';

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
