import { fork, put, select, takeLatest } from 'redux-saga/effects';
import * as _ from "lodash";
import listSaga from "./list/list.saga";
import editSaga from "./edit/edit.saga";
import createSaga from "./create/create.saga";
import { API_CALL_ERROR } from '../../store/action';
import { GET_ALL_SERVERS_REQUESTED, GET_ALL_SERVERS_SUCCEEDED } from './server.action';
import { ApiService } from '../../api/api.service';
import { AppInjector } from '../../app-injector';

function* allSaga() {
  const api = AppInjector.get(ApiService);
  const fetchStatus = yield select((state) => (state as any).Server.all.fetched);
  if (!fetchStatus) {
    try {
      let results = yield api.server.list().toPromise();
      yield put({type: GET_ALL_SERVERS_SUCCEEDED, data: results});
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const data = yield select((state) => (state as any).Server.all.items);
    yield put({type: GET_ALL_SERVERS_SUCCEEDED, data: data});
  }
}

function* watchFetchAllServersRequest() {
  yield takeLatest(GET_ALL_SERVERS_REQUESTED, allSaga);
}
export default _.map([...listSaga, ...editSaga, ...createSaga, watchFetchAllServersRequest], item =>
  fork(item)
);
