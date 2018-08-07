import { PreloaderService } from './../common/services/preloader/preloader.service';
import { AppInjector } from './../app-injector';
import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects';
import main from '../components/main.saga';
import auth from '../components/auth/auth.saga';
import { API_CALL_ERROR } from './action';
import { NotificationService } from '../common/services/notification/notification.service';
import aclSaga from '../components/acl/acl.saga';
import userSaga from '../components/user/user.saga';
import profileSaga from '../components/profile/profile.saga';
import projectSaga from './../components/project/project.saga';
import statusSaga from './../components/status/status.saga';
import frameworkSaga from './../components/framework/framework.saga';
import serverSaga from './../components/server/server.saga';
import categorySaga from './../components/category/category.saga';

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
  yield [...[fork(watchApiCallError)], ...categorySaga, ...serverSaga, ...frameworkSaga, ...statusSaga, ...projectSaga, ...main, ...auth, ...aclSaga, ...userSaga, ...profileSaga];
}
