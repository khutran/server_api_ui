import { NotificationService } from './../../../common/services/notification/notification.service';
import { Router } from '@angular/router';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put } from 'redux-saga/effects';
import { UPDATE_ORDER_REQUESTED, UPDATE_ORDER_SUCCEEDED } from './edit.actions';
import { ApiService } from '../../../api/api.service';

function* updateOrder(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.order.update(action.data).toPromise();
    yield put({ type: UPDATE_ORDER_SUCCEEDED, data: result });
    AppInjector.get(NotificationService).show('success', 'Order Updated', 3000);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchUpdateOrderRequest() {
  yield takeEvery(UPDATE_ORDER_REQUESTED, updateOrder);
}

export default [watchUpdateOrderRequest];
