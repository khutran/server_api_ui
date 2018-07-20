import { Router } from '@angular/router';
import { FETCH_COURIERS_REQUESTED } from './../list/list.actions';
import { DELETE_COURIER_REQUESTED, GET_COURIER_REQUESTED, GET_COURIER_SUCCEEDED, EDIT_COURIER_REQUESTED } from './edit.actions';
import { takeEvery, put } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';

function* editCourier(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.courier.update(action.data).toPromise();
    router.navigate(['courier']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchEditCourierRequest() {
  yield takeEvery(EDIT_COURIER_REQUESTED, editCourier);
}

function* getCourier(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.courier.getItemById(action.data).toPromise();
    yield put({ type: GET_COURIER_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchGetCourierRequest() {
  yield takeEvery(GET_COURIER_REQUESTED, getCourier);
}

function* deleteCourier(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.courier.delete(action.data).toPromise();
    yield put({ type: FETCH_COURIERS_REQUESTED });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteCourierRequest() {
  yield takeEvery(DELETE_COURIER_REQUESTED, deleteCourier);
}

export default [watchEditCourierRequest, watchGetCourierRequest, watchDeleteCourierRequest];
