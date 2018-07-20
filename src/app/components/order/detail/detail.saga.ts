import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { ApiService } from '../../../api/api.service';
import { FETCH_ORDER_DETAIL_SUCCEEDED, FETCH_ORDER_DETAIL_REQUESTED, GET_ORDER_USER_PROFILE } from './detail.actions';

function* getOrder(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.order.getItemById(action.data).toPromise();
    yield put({ type: FETCH_ORDER_DETAIL_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchOrderDetailRequest() {
  yield takeEvery(FETCH_ORDER_DETAIL_REQUESTED, getOrder);
}

function* getUserProfile(action) {
  try {
    const result = yield AppInjector.get(ApiService)
      .user.getItemById(action.data.getUserId())
      .toPromise();
    yield put({ type: GET_ORDER_USER_PROFILE, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchOrderDetailSuccess() {
  yield takeLatest(FETCH_ORDER_DETAIL_SUCCEEDED, getUserProfile);
}

export default [watchFetchOrderDetailRequest, watchFetchOrderDetailSuccess];
