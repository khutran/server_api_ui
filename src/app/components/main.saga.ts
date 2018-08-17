import { takeLatest, put, select, fork } from 'redux-saga/effects';
import * as _ from 'lodash';
import { FETCH_LOGIN_DETAIL_SUCCEEDED } from './auth/login/login.actions';
import { AppMenunItems } from '../template/shared/app-menu-items/app-menu-items';

function* initAppMenu(action) {
  const MenuItems = AppMenunItems;
  yield put({
    type: 'INIT_APP_MENU',
    data: MenuItems,
    user: action.data
  });
}

function* watchFetchLoginDetailSuccessed() {
  yield takeLatest(FETCH_LOGIN_DETAIL_SUCCEEDED, initAppMenu);
}

export default _.map([watchFetchLoginDetailSuccessed], item => fork(item));
