import { Router } from '@angular/router';
import { FETCH_PROJECTS_REQUESTED } from './../list/list.actions';
import { DELETE_PROJECT_REQUESTED, GET_PROJECT_REQUESTED, GET_PROJECT_SUCCEEDED, EDIT_PROJECT_REQUESTED, RENDER_EDIT_PROJECT_FORM_REQUESTED } from './edit.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* editProject(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.project.update(action.data).toPromise();
    router.navigate(['project']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditProjectRequest() {
  yield takeEvery(EDIT_PROJECT_REQUESTED, editProject);
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

export default [watchEditProjectRequest, watchGetProjectRequest, watchDeleteProjectRequest, watchRenderProjectDetailFormRequested];
