import { Router, ActivatedRoute } from '@angular/router';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUESTED, LOGIN_SUCCEEDED, FETCH_LOGIN_DETAIL_REQUESTED, FETCH_LOGIN_DETAIL_SUCCEEDED } from './login.actions';
import { ApiService } from '../../../api/api.service';
import * as Cookies from 'js-cookie';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../common/services/notification/notification.service';
import * as _ from 'lodash';

function parseQuery(queryString) {
  let query = {};
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

function* login(action) {
  try {
    const api = AppInjector.get(ApiService);
    let result = yield api.auth.login(action.data).toPromise();
    yield put({ type: LOGIN_SUCCEEDED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchLoginRequest() {
  yield takeEvery(LOGIN_REQUESTED, login);
}

function* login_success(action) {
  Cookies.set(environment.jwtTokenKey, action.data.access_token, { path: '/' });
  AppInjector.get(NotificationService).show('success', 'Login Success', 5000);
  yield put({ type: FETCH_LOGIN_DETAIL_REQUESTED, com: 'LOGIN_COMPONENT' });
}

function* watchLoginSUCCEEDED() {
  yield takeLatest(LOGIN_SUCCEEDED, login_success);
}

function* redirect(action) {
  if (!_.isUndefined(action.com) && action.com === 'LOGIN_COMPONENT') {
    const router = AppInjector.get(Router);
    const activatedRouter = AppInjector.get(ActivatedRoute);
    if (!_.isUndefined(activatedRouter.snapshot.queryParams.redirect)) {
      let queryParams = parseQuery(activatedRouter.snapshot.queryParams.search);
      router.navigateByUrl(decodeURIComponent(activatedRouter.snapshot.queryParams.redirect), { queryParams });
    } else {
      router.navigate(['dashboard']);
    }
  }
}

function* watchFetchLoginDetailSUCCEEDED() {
  yield takeLatest(FETCH_LOGIN_DETAIL_SUCCEEDED, redirect);
}

function* fetchProfileDetail(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.user.profile({ includes: 'roles' }).toPromise();
    if (!_.isUndefined(action.com)) {
      yield put({ type: FETCH_LOGIN_DETAIL_SUCCEEDED, data: result, com: action.com });
    } else {
      yield put({ type: FETCH_LOGIN_DETAIL_SUCCEEDED, data: result });
    }
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchProfileRequest() {
  yield takeLatest(FETCH_LOGIN_DETAIL_REQUESTED, fetchProfileDetail);
}

export default [watchLoginRequest, watchLoginSUCCEEDED, watchFetchLoginDetailSUCCEEDED, watchFetchProfileRequest];
