import { API_CALL_ERROR } from '../../../store/action';
import { CREATE_USER_REQUESTED, CREATE_USER_SUCCEEDED } from '../../auth/create/create.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { RENDER_PROFILE_DETAIL_FORM, FETCH_PROFILE_DETAIL_REQUESTED, FETCH_PROFILE_DETAIL_SUCCESSED, FILL_PROFILE_DETAIL_FORM } from './detail.action';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import * as _ from 'lodash';

function* watchProfileDetailFormRendered() {
  yield takeLatest(RENDER_PROFILE_DETAIL_FORM, function*(action) {
    yield put({ type: FETCH_PROFILE_DETAIL_REQUESTED });
  });
}

function* fetchProfileDetail(action) {
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.user.profile({ includes: 'roles' }).toPromise();
    yield put({ type: FETCH_PROFILE_DETAIL_SUCCESSED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchProfileDetailRequested() {
  yield takeLatest(FETCH_PROFILE_DETAIL_REQUESTED, fetchProfileDetail);
}

function* fillProfileDetailForm(action) {
  const data = {
    first_name: action.data.getFirstName(),
    last_name: action.data.getLastName(),
    email: action.data.getEmail(),
    gender: action.data.getGender()
  };
  yield put({ type: FILL_PROFILE_DETAIL_FORM, data: data });
}

function* watchFetchProfileDetailSuccessed() {
  yield takeLatest(FETCH_PROFILE_DETAIL_SUCCESSED, fillProfileDetailForm);
}

export default [watchProfileDetailFormRendered, watchFetchProfileDetailRequested, watchFetchProfileDetailSuccessed];
