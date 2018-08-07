import { CREATE_SERVER_REQUESTED, CREATE_SERVER_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createServer(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.server.create(action.data).toPromise();
    yield put({ type: CREATE_SERVER_SUCCEEDED, data: result });
    router.navigate(['servers']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateServerRequest() {
  yield takeEvery(CREATE_SERVER_REQUESTED, createServer);
}

export default [watchCreateServerRequest];
