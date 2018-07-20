import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { FORGOT_PASSWORD_REQUESTED, FORGOT_PASSWORD_SUCCEEDED } from "./forgot-password.actions";
import { takeEvery, put } from "redux-saga/effects";
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';

function* forgotPassword(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.auth.forgotPassword(action.data).toPromise();
    yield put({ type: FORGOT_PASSWORD_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchForgotPasswordRequest() {
  yield takeEvery(FORGOT_PASSWORD_REQUESTED, forgotPassword);
}

export default [
  watchForgotPasswordRequest,
];
