import { PreloaderService } from './../common/services/preloader/preloader.service';
import { AppInjector } from './../app-injector';
import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects';

import main from '../components/main.saga';
import auth from '../components/auth/auth.saga';
import product from '../components/product/product.saga';
import customer from '../components/customer/customer.saga';
import order from '../components/order/order.saga';
import category from '../components/category/category.saga';
import designer from './../components/designer/designer.saga';
import currencySaga from './../components/currency/currency.saga';
import courierSaga from './../components/courier/courier.saga';
import { API_CALL_ERROR } from './action';
import { NotificationService } from '../common/services/notification/notification.service';
import aclSaga from '../components/acl/acl.saga';
import userSaga from '../components/user/user.saga';
import constantSaga from './constant/constant.saga';
import provider from './../components/provider/provider.saga';
import printSaga from './print/print.saga';
import profileSaga from '../components/profile/profile.saga';

function* watchApiCallError() {
  yield takeEvery(API_CALL_ERROR, function*(action) {
    AppInjector.get(PreloaderService).hide();
    if ((action as any).error !== undefined) {
      if ((action as any).error.error !== undefined && (action as any).error.error.message !== undefined) {
        AppInjector.get(NotificationService).show('warning', (action as any).error.error.message, 5000);
      }
    }
  });
}

export default function* sagas() {
  yield [
    ...[fork(watchApiCallError)],
    ...main,
    ...auth,
    ...product,
    ...customer,
    ...order,
    ...designer,
    ...category,
    ...aclSaga,
    ...constantSaga,
    ...provider,
    ...userSaga,
    ...printSaga,
    ...currencySaga,
    ...courierSaga,
    ...profileSaga
  ];
}
