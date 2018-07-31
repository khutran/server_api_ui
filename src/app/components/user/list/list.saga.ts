import { Router } from '@angular/router';
import { API_CALL_ERROR } from './../../../store/action';
import { PreloaderService } from './../../../common/services/preloader/preloader.service';
import { USER_COMP } from './../user.const';
import { AppInjector } from './../../../app-injector';
import { FETCH_ALL_USER_REQUESTED, FETCH_ALL_USER_SUCCEEDED, DELETE_USER_REQUESTED, DELETE_USER_SUCCEEDED } from './list.actions';
import { takeEvery, put } from 'redux-saga/effects';
import { ApiService } from '../../../api/api.service';
import * as _ from 'lodash';

function* getUsers(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const results = yield AppInjector.get(ApiService)
      .user.get(action.data)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case USER_COMP:
          yield put({
            type: FETCH_ALL_USER_SUCCEEDED,
            data: results,
            com: USER_COMP
          });
          break;
        default:
          break;
      }
    } else {
    }
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchAllUserRequest() {
  yield takeEvery(FETCH_ALL_USER_REQUESTED, getUsers);
}

function* deleteUser(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const result = yield AppInjector.get(ApiService)
      .user.delete(action.data)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case USER_COMP:
          yield put({
            type: DELETE_USER_SUCCEEDED,
            data: result,
            com: action.com
          });
          break;

        default:
          break;
      }
    } else {
    }
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteUserRequest() {
  yield takeEvery(DELETE_USER_REQUESTED, deleteUser);
}

function* reloadUsers(action) {
  try {
    AppInjector.get(PreloaderService).show();
    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case USER_COMP:
          AppInjector.get(Router).navigate(['/user']);
          break;

        default:
          break;
      }
    }
  } catch (e) {
    AppInjector.get(PreloaderService).show();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDeleteUserSuccess() {
  yield takeEvery(DELETE_USER_SUCCEEDED, reloadUsers);
}

export default [watchFetchAllUserRequest, watchDeleteUserRequest, watchDeleteUserSuccess];
