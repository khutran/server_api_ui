import { fork, put, select, takeLatest, call } from 'redux-saga/effects';
import * as _ from 'lodash';
import listSaga from './list/list.saga';
import editSaga from './edit/edit.saga';
import createSaga from './create/create.saga';
import { API_CALL_ERROR } from '../../store/action';
import { GET_ALL_SERVERS_REQUESTED, GET_ALL_SERVERS_SUCCEEDED } from './server.action';
import { ApiService } from '../../api/api.service';
import { AppInjector } from '../../app-injector';

export function* fetchAllServer() {
  const fetchStatus = yield select(state => (state as any).Server.all.fetched);
  if (!fetchStatus) {
    try {
      let result = yield AppInjector.get(ApiService)
        .server.list()
        .toPromise();
      return result;
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const data = yield select(state => (state as any).Server.all.items);
    return data;
  }
}

function* allSaga(action) {
  const data = yield call(fetchAllServer);
  yield put({ type: GET_ALL_SERVERS_SUCCEEDED, component: action.component, data: data });
}

function* watchFetchAllServersRequest() {
  yield takeLatest(GET_ALL_SERVERS_REQUESTED, allSaga);
}
export default _.map([...listSaga, ...editSaga, ...createSaga, watchFetchAllServersRequest], item => fork(item));
