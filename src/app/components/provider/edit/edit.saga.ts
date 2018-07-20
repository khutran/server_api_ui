import { Router } from '@angular/router';
import { FETCH_PROVIDERS_REQUESTED } from './../list/list.actions';
import { DELETE_PROVIDER_REQUESTED, GET_PROVIDER_REQUESTED, GET_PROVIDER_SUCCEEDED, EDIT_PROVIDER_REQUESTED } from './edit.actions';
import { takeEvery, put } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* editProvider(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.provider.update(action.data).toPromise();
    router.navigate(['provider']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditProviderRequest() {
  yield takeEvery(EDIT_PROVIDER_REQUESTED, editProvider);
}

function* getProvider(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.provider.getItemById(action.data).toPromise();
    yield put({ type: GET_PROVIDER_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetProviderRequest() {
  yield takeEvery(GET_PROVIDER_REQUESTED, getProvider);
}

function* deleteProvider(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.provider.delete(action.data).toPromise();
    yield put({ type: FETCH_PROVIDERS_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteProviderRequest() {
  yield takeEvery(DELETE_PROVIDER_REQUESTED, deleteProvider);
}

export default [watchEditProviderRequest, watchGetProviderRequest, watchDeleteProviderRequest];
