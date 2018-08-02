import { FETCH_PROJECTS_SUCCEEDED, FETCH_PROJECTS_REQUESTED, BUILD_PROJECT_REQUESTED, BUILD_PROJECT_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { put, takeLatest } from 'redux-saga/effects';
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

function* build(action) {
  try {
    let create = yield AppInjector.get(ApiService)
      .project.clone(action.data)
      .toPromise();
    let infoDb = yield AppInjector.get(ApiService)
      .project.createDb(action.data)
      .toPromise();
    let createConfig = yield AppInjector.get(ApiService)
      .project.createConfig(action.data)
      .toPromise();
    let updateConfig = yield AppInjector.get(ApiService)
      .project.updateConfig(action.data, infoDb.data.Dbname, infoDb.data.User, infoDb.data.Password)
      .toPromise();
    let runPackageControl = yield AppInjector.get(ApiService)
      .project.runPackageControl(action.data)
      .toPromise();
    let runFirtsBuild = yield AppInjector.get(ApiService)
      .project.runFirtsBuild(action.data)
      .toPromise();
    let replaceDb = yield AppInjector.get(ApiService)
      .project.replaceDb(action.data)
      .toPromise();
    yield put({ type: BUILD_PROJECT_SUCCEEDED, data: replaceDb.items, pagination: replaceDb.pagination });
    AppInjector.get(NotificationService).show('success', 'Build success', 5000);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchBuildProjectRequested() {
  yield takeLatest(BUILD_PROJECT_REQUESTED, build);
}

export default [watchFetchProjectsRequest, watchBuildProjectRequested];
