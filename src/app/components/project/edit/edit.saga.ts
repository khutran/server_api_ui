import { Router } from '@angular/router';
import { FETCH_PROJECTS_REQUESTED } from './../list/list.actions';
import {
  DELETE_PROJECT_REQUESTED,
  GET_PROJECT_REQUESTED,
  GET_PROJECT_SUCCEEDED,
  EDIT_PROJECT_REQUESTED,
  RENDER_EDIT_PROJECT_FORM_REQUESTED,
  FILL_PROJECT_DETAIL_FORM
} from './edit.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

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

function* getProject(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.project.getItemById(action.data).toPromise();
    yield put({ type: GET_PROJECT_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetProjectRequest() {
  yield takeEvery(GET_PROJECT_REQUESTED, getProject);
}

function* deleteProject(action) {
  const api = AppInjector.get(ApiService);
  try {
    yield api.project.delete(action.data).toPromise();
    yield put({ type: FETCH_PROJECTS_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteProjectRequest() {
  yield takeEvery(DELETE_PROJECT_REQUESTED, deleteProject);
}

function* watchRenderProjectDetailFormRequested() {
  yield takeLatest(RENDER_EDIT_PROJECT_FORM_REQUESTED, function*(action: any) {
    yield put({ type: GET_PROJECT_REQUESTED, data: action.data.project_id });
  });
}

function* fillProjectDetailForm(action) {
  const data = {
    name: action.data.name,
    git_remote: action.data.git_remote,
    git_branch: action.data.git_branch,
    git_application_key: action.data.git_application_key,
    git_application_secret: action.data.git_application_secret,
    database: action.data.database
  };
  yield put({ type: FILL_PROJECT_DETAIL_FORM, data: data });
}

function* watchFetchProjectDetailSuccessed() {
  yield takeLatest(GET_PROJECT_SUCCEEDED, fillProjectDetailForm);
}

export default [watchEditProjectRequest, watchGetProjectRequest, watchDeleteProjectRequest, watchRenderProjectDetailFormRequested, watchFetchProjectDetailSuccessed];
