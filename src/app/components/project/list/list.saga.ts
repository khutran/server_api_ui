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

function* clone(id) {
  return yield AppInjector.get(ApiService)
    .project.clone(id)
    .toPromise();
}

function* createDb(id) {
  return yield AppInjector.get(ApiService)
    .project.createDb(id)
    .toPromise();
}

function* createConfig(id) {
  return yield AppInjector.get(ApiService)
    .project.createConfig(id)
    .toPromise();
}

function* updateConfig(id, db, user, pass) {
  return yield AppInjector.get(ApiService)
    .project.updateConfig(id, db, user, pass)
    .toPromise();
}

function* runPackageControl(id) {
  return yield AppInjector.get(ApiService)
    .project.runPackageControl(id)
    .toPromise();
}

function* runFirtsBuild(id) {
  return yield AppInjector.get(ApiService)
    .project.runFirtsBuild(id)
    .toPromise();
}

function* replaceDb(id) {
  return yield AppInjector.get(ApiService)
    .project.replaceDb(id)
    .toPromise();
}

function* build(action) {
  try {
    const [cloneProject, Db] = yield all([call(clone, action.data), call(createDb, action.data)]);
    yield call(createConfig, action.data);
    yield call(updateConfig, action.data, Db.data.Dbname, Db.data.User, Db.data.Password);
    yield call(runPackageControl, action.data);
    yield call(runFirtsBuild, action.data);
    yield call(replaceDb, action.data);
    yield put({ type: BUILD_PROJECT_SUCCEEDED, data: cloneProject.items, pagination: cloneProject.pagination });
    AppInjector.get(NotificationService).show('success', 'Build success', 5000);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchBuildProjectRequested() {
  yield takeLatest(BUILD_PROJECT_REQUESTED, build);
}

export default [watchFetchProjectsRequest, watchBuildProjectRequested];
