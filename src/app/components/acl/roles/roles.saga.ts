import { ROLE_COMP } from './roles.const';
import { FETCH_ALL_ROLE_REQUESTED } from './roles.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { put, takeEvery, fork } from 'redux-saga/effects';
import * as _ from 'lodash';
import { FETCH_ALL_ROLE_SUCCEEDED } from './list/list.actions';
import { FETCH_ROLE_DETAIL_SUCCEEDED } from './edit/edit.actions';
import createRoleSaga from './create/create.saga';
import listRoleSaga from './list/list.saga';
import editRoleSaga from './edit/edit.saga';
import { USER_COMP } from '../../user/user.const';

function* getRoles(action) {
  const api = AppInjector.get(ApiService);
  try {
    const results = yield api.role.listWithPermission({}).toPromise();
    let put_data: any = {
      type: FETCH_ALL_ROLE_SUCCEEDED,
      data: results
    };

    if (!_.isNil(action.except)) {
      put_data.except = action.except;
    }
    if (!_.isUndefined(action.com)) {
      put_data.com = action.com;
    }

    yield put(put_data);
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchAllRoleRequest() {
  yield takeEvery(FETCH_ALL_ROLE_REQUESTED, getRoles);
}

export default [...listRoleSaga, ...createRoleSaga, ...editRoleSaga, watchFetchAllRoleRequest];
