import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { FETCH_PRODUCT_DETAIL_REQUESTED, FETCH_PRODUCT_DETAIL_SUCCEEDED, MAP_CATEGORIES_TO_PRODUCT } from "./detail.actions";
import { takeEvery, put } from "redux-saga/effects";
import { ApiService } from '../../../api/api.service';

function* getProductDetail(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.product.getItemById(action.data).toPromise();
    // console.log(result);
    yield put({ type: FETCH_PRODUCT_DETAIL_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchProductDetailRequest() {
  yield takeEvery(FETCH_PRODUCT_DETAIL_REQUESTED, getProductDetail);
}


export default [
  watchFetchProductDetailRequest
];
