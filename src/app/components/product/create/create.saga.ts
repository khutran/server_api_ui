import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put } from 'redux-saga/effects';
import { CREATE_PRODUCT_REQUESTED, CREATE_PRODUCT_SUCCEEDED } from "./create.actions";
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { Router } from '@angular/router';

function* createProduct(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.product.create(action.data).toPromise();
    yield put({ type: CREATE_PRODUCT_SUCCEEDED, data: result });
    router.navigate([action.redirect]);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateProductRequested() {
  yield takeEvery(CREATE_PRODUCT_REQUESTED, createProduct);
}

export default [
  watchCreateProductRequested,
];
