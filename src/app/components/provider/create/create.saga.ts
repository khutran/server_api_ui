import { CREATE_PROVIDER_REQUESTED, CREATE_PROVIDER_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createProvider(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.provider.create(action.data).toPromise();
    yield put({ type: CREATE_PROVIDER_SUCCEEDED, data: result });
    router.navigate(['provider']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateProviderRequest() {
  yield takeEvery(CREATE_PROVIDER_REQUESTED, createProvider);
}

export default [watchCreateProviderRequest];
