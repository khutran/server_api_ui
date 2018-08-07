import * as _ from 'lodash';
import { Router } from '@angular/router';
import {
  FETCH_PROJECT_DETAIL_REQUESTED,
  FETCH_PROJECT_DETAIL_SUCCEEDED,
  EDIT_PROJECT_REQUESTED,
  RENDER_EDIT_PROJECT_FORM_REQUESTED,
  BUILD_PROJECT_REQUESTED,
  BUILD_PROJECT_SUCCEEDED
} from './detail.actions';
import { takeEvery, put, takeLatest, call, all } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { fetchAllServer } from '../../server/server.saga';
import { fetchAllFramework } from '../../framework/framework.saga';
import { fetchAllStatus } from '../../status/status.saga';
import { fetchAllCategory } from '../../category/category.saga';
import { NotificationService } from '../../../common/services/notification/notification.service';

function* edit(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.project.update(action.data).toPromise();
    router.navigate(['projects']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditProjectRequest() {
  yield takeEvery(EDIT_PROJECT_REQUESTED, edit);
}

export function* fetchProjectDetail(id) {
  return yield AppInjector.get(ApiService)
    .project.getItemById(id)
    .toPromise();
}

function* getProject(action) {
  const [project, servers, frameworks, status, categories] = yield all([
    call(fetchProjectDetail, action.data),
    call(fetchAllServer),
    call(fetchAllFramework),
    call(fetchAllStatus),
    call(fetchAllCategory)
  ]);
  yield put({ type: FETCH_PROJECT_DETAIL_SUCCEEDED, data: project });
}

function* watchGetProjectRequest() {
  yield takeEvery(FETCH_PROJECT_DETAIL_REQUESTED, getProject);
}

function* deleteP(id) {
  return AppInjector.get(ApiService)
    .project.delete(id)
    .toPromise();
}

function* watchRenderProjectDetailFormRequested() {
  yield takeLatest(RENDER_EDIT_PROJECT_FORM_REQUESTED, function*(action: any) {
    yield put({ type: FETCH_PROJECT_DETAIL_REQUESTED, data: action.data.project_id });
  });
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

export default [watchEditProjectRequest, watchGetProjectRequest, watchRenderProjectDetailFormRequested, watchBuildProjectRequested];
