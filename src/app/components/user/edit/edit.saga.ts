import { PreloaderService } from './../../../common/services/preloader/preloader.service';
import { USER_COMP } from './../user.const';
import { FETCH_ALL_ROLE_REQUESTED } from './../../acl/roles/roles.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import {
  FETCH_USER_DETAIL_REQUESTED,
  FETCH_USER_DETAIL_SUCCEEDED,
  UPDATED_USER_REQUESTED,
  UPDATED_USER_SUCCEEDED,
  ATTACH_ROLE_TO_USER_REQUESTED,
  ATTACH_ROLE_TO_USER_SUCCEEDED,
  DETACH_ROLE_REQUESTED,
  DETACH_ROLE_SUCCEEDED,
  ATTACH_ROLES_USER_REQUESTED,
  ATTACH_ROLES_USER_SUCCESSED
} from './edit.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { NotificationService } from '../../../common/services/notification/notification.service';

function* fetchUserDetail(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const result = yield AppInjector.get(ApiService)
      .user.getItemById(action.data)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      yield put({
        type: FETCH_USER_DETAIL_SUCCEEDED,
        com: action.com,
        data: result
      });
    } else {
      yield put({
        type: FETCH_USER_DETAIL_SUCCEEDED,
        data: result
      });
    }
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchUserDetailRequest() {
  yield takeEvery(FETCH_USER_DETAIL_REQUESTED, fetchUserDetail);
}

function* fecthAllRoles(action) {
  try {
    yield put({
      type: FETCH_ALL_ROLE_REQUESTED,
      com: action.com
    });
  } catch (e) {}
}

function* watchFetchUserDetailSuccess() {
  yield takeLatest(FETCH_USER_DETAIL_SUCCEEDED, fecthAllRoles);
}

function* updateUser(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const result = yield AppInjector.get(ApiService)
      .user.update(action.data)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      yield put({
        type: UPDATED_USER_SUCCEEDED,
        com: action.com,
        data: result
      });
      AppInjector.get(NotificationService).show('success', 'User updated', 3000);
      AppInjector.get(Router).navigate([`/users/edit/${action.data.getId()}`]);
    } else {
    }
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchUpdateUserRequest() {
  yield takeEvery(UPDATED_USER_REQUESTED, updateUser);
}

function* attachRoleToUser(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const result = yield AppInjector.get(ApiService)
      .user.attachRoleToUser(action.data.userId, action.data.roleId)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      yield put({
        type: ATTACH_ROLE_TO_USER_SUCCEEDED,
        com: action.com,
        data: result
      });
      AppInjector.get(Router).navigate([`/user/edit/${action.data.userId}`]);
    } else {
    }
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchAttachRoleToUserRequest() {
  yield takeEvery(ATTACH_ROLE_TO_USER_REQUESTED, attachRoleToUser);
}

function* detachRoleUser(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const result = yield AppInjector.get(ApiService)
      .user.detachRoleFromUser(action.data)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      yield put({
        type: DETACH_ROLE_SUCCEEDED,
        com: action.com,
        data: result
      });
      AppInjector.get(Router).navigate([`/user/edit/${action.data.userId}`]);
      AppInjector.get(NotificationService).show('success', 'Role detached', 1000);
    } else {
    }
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchDetachRoleFromUserRequest() {
  yield takeEvery(DETACH_ROLE_REQUESTED, detachRoleUser);
}

function* attachRolesUser(action) {
  try {
    const result = yield AppInjector.get(ApiService)
      .user.saveRoleUser(action.data.user_id, action.data)
      .toPromise();
    yield put({ type: ATTACH_ROLES_USER_SUCCESSED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchAttachRolesUserRequest() {
  yield takeEvery(ATTACH_ROLES_USER_REQUESTED, attachRolesUser);
}

export default [
  watchAttachRolesUserRequest,
  watchFetchUserDetailRequest,
  watchFetchUserDetailSuccess,
  watchUpdateUserRequest,
  watchAttachRoleToUserRequest,
  watchDetachRoleFromUserRequest
];
