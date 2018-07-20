import { CREATE_COURIER_REQUESTED, CREATE_COURIER_SUCCEEDED } from './create.actions';
import { Router } from '@angular/router';
import { put, takeEvery } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from '../../../app-injector';

function* createCourier(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.courier.create(action.data).toPromise();
    yield put({ type: CREATE_COURIER_SUCCEEDED, data: result });
    router.navigate(['courier']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateCourierRequest() {
  yield takeEvery(CREATE_COURIER_REQUESTED, createCourier);
}

export default [watchCreateCourierRequest];
