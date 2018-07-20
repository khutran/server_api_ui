import { fork, put, select, takeLatest } from 'redux-saga/effects';
import * as _ from "lodash";
import listSaga from "./list/list.saga";
import editSaga from "./edit/edit.saga";
import createSaga from "./create/create.saga";
import { API_CALL_ERROR } from '../../store/action';
import { GET_ALL_<%= underscore(name).toUpperCase() %>S_REQUESTED, GET_ALL_<%= underscore(name).toUpperCase() %>S_SUCCEEDED } from './<%= dasherize(name) %>.action';
import { ApiService } from '../../api/api.service';
import { takeEvery } from 'redux-saga';
import { AppInjector } from '../../app-injector';

function* allSaga() {
  const api = AppInjector.get(ApiService);
  const fetchStatus = yield select((state) => (state as any).<%= classify(name) %>.all.fetched);
  if (!fetchStatus) {
    try {
      let results = yield api.<%= camelize(name) %>.list().toPromise();
      yield put({type: GET_ALL_<%= underscore(name).toUpperCase() %>S_SUCCEEDED, data: results});
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const data = yield select((state) => (state as any).<%= classify(name) %>.all.items);
    yield put({type: GET_ALL_<%= underscore(name).toUpperCase() %>S_SUCCEEDED, data: data});
  }
}

function* watchFetchAll<%= classify(name) %>sRequest() {
  yield takeEvery(GET_ALL_<%= underscore(name).toUpperCase() %>S_REQUESTED, allSaga);
}
export default _.map([...listSaga, ...editSaga, ...createSaga, watchFetchAll<%= classify(name) %>sRequest], item =>
  fork(item)
);
