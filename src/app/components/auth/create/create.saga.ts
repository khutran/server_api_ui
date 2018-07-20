import { Router } from '@angular/router';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put } from "redux-saga/effects";
import { CREATE_USER_REQUESTED, CREATE_USER_SUCCEEDED } from "./create.actions";
import { ApiService } from '../../../api/api.service';
import { NotificationService } from '../../../common/services/notification/notification.service';

function* createUser(action) {
  const api = AppInjector.get(ApiService);
  const router = AppInjector.get(Router);
  const notify = AppInjector.get(NotificationService);
  try {
    let result = yield api.auth.create(action.data).toPromise();
    router.navigate(['login']);
    notify.show('success', 'User is created successfully', 3000);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateUserRequest() {
  yield takeEvery(CREATE_USER_REQUESTED, createUser);
}

export default [
  // watchCreateUserRequest,
];
