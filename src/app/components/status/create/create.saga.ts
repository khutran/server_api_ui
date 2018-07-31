import { CREATE_STATUS_REQUESTED, CREATE_STATUS_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createStatus(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.status.create(action.data).toPromise();
    yield put({ type: CREATE_STATUS_SUCCEEDED, data: result });
    router.navigate(['status']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateStatusRequest() {
  yield takeEvery(CREATE_STATUS_REQUESTED, createStatus);
}

export default [watchCreateStatusRequest];
