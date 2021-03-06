import { fork, put, select, takeLatest } from 'redux-saga/effects';
import * as _ from 'lodash';
import listSaga from './list/list.saga';
import editSaga from './edit/edit.saga';
import createSaga from './create/create.saga';
import envSaga from './env/env.saga';
import { API_CALL_ERROR } from '../../store/action';
import { GET_ALL_PROJECTS_REQUESTED, GET_ALL_PROJECTS_SUCCEEDED } from './project.action';
import { ApiService } from '../../api/api.service';
import { AppInjector } from '../../app-injector';

function* allSaga() {
  const api = AppInjector.get(ApiService);
  const fetchStatus = yield select(state => (state as any).Project.all.fetched);
  if (!fetchStatus) {
    try {
      let results = yield api.project.list().toPromise();
      yield put({ type: GET_ALL_PROJECTS_SUCCEEDED, data: results });
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const data = yield select(state => (state as any).Project.all.items);
    yield put({ type: GET_ALL_PROJECTS_SUCCEEDED, data: data });
  }
}

function* watchFetchAllProjectsRequest() {
  yield takeLatest(GET_ALL_PROJECTS_REQUESTED, allSaga);
}
export default _.map([...listSaga, ...editSaga, ...createSaga, ...envSaga, watchFetchAllProjectsRequest], item => fork(item));
