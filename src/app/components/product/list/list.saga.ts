import { PreloaderService } from './../../../common/services/preloader/preloader.service';
import { ApiService } from './../../../api/api.service';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import {
  FETCH_PRODUCTS_REQUESTED,
  FETCH_PRODUCTS_SUCCEEDED,
  MAP_CATEGORIES_TO_PRODUCTS,
  BROADCAST_ITEM_REQUESTED,
  BROADCAST_ITEM_SUCCESSED,
  UPDATE_PRODUCT_STATUS_REQUESTED,
  UPDATE_PRODUCT_STATUS_SUCCESSED,
  FETCH_PRODUCT_IMAGE_SUCCESSED
} from './list.actions';
import { takeEvery, put, select, takeLatest } from 'redux-saga/effects';
import * as _ from 'lodash';
import { NotificationService } from '../../../common/services/notification/notification.service';

function* fetchProducts(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.product.get(action.data.pagination, action.data.sort, action.data.filter).toPromise();
    yield put({ type: FETCH_PRODUCTS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchProductRequested() {
  yield takeEvery(FETCH_PRODUCTS_REQUESTED, fetchProducts);
}

function* mapCategoriesToProduct(action) {
  const api = AppInjector.get(ApiService);
  try {
    let categories = yield select(state => (state as any).Category.list.items);
    yield put({ type: MAP_CATEGORIES_TO_PRODUCTS, data: categories });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* fetchProductImages(action) {
  try {
    let request = yield AppInjector.get(ApiService)
      .media.get({ object_type: 'Product', object_ids: action.data.map(item => item.getId()).join(','), per_page: action.data.length })
      .toPromise();
    yield put({ type: FETCH_PRODUCT_IMAGE_SUCCESSED, data: request.items, pagination: request.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchProductsSuccessed() {
  yield takeLatest(FETCH_PRODUCTS_SUCCEEDED, mapCategoriesToProduct);
  yield takeLatest(FETCH_PRODUCTS_SUCCEEDED, fetchProductImages);
}

function* broadcast_product_successed(action) {
  AppInjector.get(NotificationService).show('success', 'new product is added', 3000);
}

function* watchBroadcastItemSuccessed() {
  yield takeEvery(BROADCAST_ITEM_SUCCESSED, broadcast_product_successed);
}

function* updateProductStatus(action) {
  AppInjector.get(PreloaderService).show();
  try {
    let params = { status: action.data.status };
    let result = yield AppInjector.get(ApiService)
      .product.changeStatus(action.data.id, params)
      .toPromise();
    yield put({ type: UPDATE_PRODUCT_STATUS_SUCCESSED, data: result });
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchUpdateProductStatusRequested() {
  yield takeEvery(UPDATE_PRODUCT_STATUS_REQUESTED, updateProductStatus);
}

export default [watchFetchProductRequested, watchFetchProductsSuccessed, watchBroadcastItemSuccessed, watchUpdateProductStatusRequested];
