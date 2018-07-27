import { CREATE_TEST_REQUESTED, CREATE_TEST_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createTest(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.test.create(action.data).toPromise();
    yield put({ type: CREATE_TEST_SUCCEEDED, data: result });
    router.navigate(['test']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateTestRequest() {
  yield takeEvery(CREATE_TEST_REQUESTED, createTest);
}

export default [watchCreateTestRequest];
