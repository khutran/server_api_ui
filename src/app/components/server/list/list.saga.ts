import { FETCH_SERVERS_SUCCEEDED, FETCH_SERVERS_REQUESTED, SORT_SERVERS_REQUESTED, SORT_SERVERS_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';

function* getServers(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.server.get(action.data).toPromise();
    yield put({ type: FETCH_SERVERS_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchServersRequest() {
  yield takeEvery(FETCH_SERVERS_REQUESTED, getServers);
}

export default [
  watchFetchServersRequest
];
