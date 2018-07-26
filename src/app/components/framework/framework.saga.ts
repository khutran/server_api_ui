import { fork, put, select, takeLatest } from 'redux-saga/effects';
import * as _ from 'lodash';
import listSaga from './list/list.saga';
import editSaga from './edit/edit.saga';
import createSaga from './create/create.saga';
import { API_CALL_ERROR } from '../../store/action';
import { GET_ALL_FRAMEWORKS_REQUESTED, GET_ALL_FRAMEWORKS_SUCCEEDED } from './framework.action';
import { ApiService } from '../../api/api.service';
import { takeEvery } from 'redux-saga';
import { AppInjector } from '../../app-injector';

function* allSaga(action) {
  const api = AppInjector.get(ApiService);
  const fetchStatus = yield select(state => (state as any).Framework.all.fetched);
  if (!fetchStatus) {
    try {
      let results = yield api.framework.list().toPromise();
      yield put({ type: GET_ALL_FRAMEWORKS_SUCCEEDED, component: action.component, data: results });
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const data = yield select(state => (state as any).Framework.all.items);
    yield put({ type: GET_ALL_FRAMEWORKS_SUCCEEDED, component: action.component, data: data });
  }
}

function* watchFetchAllFrameworksRequest() {
  yield takeEvery(GET_ALL_FRAMEWORKS_REQUESTED, allSaga);
}
export default _.map([...listSaga, ...editSaga, ...createSaga, watchFetchAllFrameworksRequest], item => fork(item));
