import { GET_ALL_CATEGORIES_REQUESTED } from './../../category/category.actions';
import { FETCH_PRODUCT_DETAIL_SUCCEEDED } from './../detail/detail.actions';
import { Router } from '@angular/router';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put } from 'redux-saga/effects';
import { UPDATE_PRODUCT_REQUESTED, UPDATE_PRODUCT_SUCCEEDED, DELETE_PRODUCT_REQUESTED, DELETE_PRODUCT_SUCCEEDED } from './edit.actions';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { UtilityService } from '../../../common/services/utility/utility.service';
import { GET_ALL_CATEGORIES_SUCCEEDED } from '../../category/category.actions';

function* updateProduct(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.product.update(action.data).toPromise();
    yield put({ type: UPDATE_PRODUCT_SUCCEEDED, data: result });
    AppInjector.get(NotificationService).show('success', 'Successfully edit product', 5000);
    let redirect = 'product';
    if (action.redirect) {
      redirect = action.redirect;
    }
    AppInjector.get(UtilityService).reset();
    router.navigate([redirect]);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchUpdateProductRequested() {
  yield takeEvery(UPDATE_PRODUCT_REQUESTED, updateProduct);
}

function* deleteProduct(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  try {
    let result = yield api.product.delete(action.data).toPromise();
    yield put({ type: DELETE_PRODUCT_SUCCEEDED });
    router.navigate(['product']);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteProductRequested() {
  yield takeEvery(DELETE_PRODUCT_REQUESTED, deleteProduct);
}

function* watchFetchProductSuccessed() {
  yield takeEvery(FETCH_PRODUCT_DETAIL_SUCCEEDED, function*() {
    yield put({
      type: GET_ALL_CATEGORIES_REQUESTED
    });
  });
}

export default [watchUpdateProductRequested, watchDeleteProductRequested, watchFetchProductSuccessed];
