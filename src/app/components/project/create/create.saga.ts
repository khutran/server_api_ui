import { CREATE_PROJECT_REQUESTED, CREATE_PROJECT_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createProject(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.project.create(action.data).toPromise();
    yield put({ type: CREATE_PROJECT_SUCCEEDED, data: result });
    router.navigate(['project']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateProjectRequest() {
  yield takeEvery(CREATE_PROJECT_REQUESTED, createProject);
}

export default [watchCreateProjectRequest];
