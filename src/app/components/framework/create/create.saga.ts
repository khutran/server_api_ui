import { CREATE_FRAMEWORK_REQUESTED, CREATE_FRAMEWORK_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createFramework(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.framework.create(action.data).toPromise();
    yield put({ type: CREATE_FRAMEWORK_SUCCEEDED, data: result });
    router.navigate(['framework']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateFrameworkRequest() {
  yield takeEvery(CREATE_FRAMEWORK_REQUESTED, createFramework);
}

export default [watchCreateFrameworkRequest];
