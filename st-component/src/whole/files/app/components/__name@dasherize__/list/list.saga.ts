import { FETCH_<%= underscore(name).toUpperCase() %>S_SUCCEEDED, FETCH_<%= underscore(name).toUpperCase() %>S_REQUESTED, SORT_<%= underscore(name).toUpperCase() %>S_REQUESTED, SORT_<%= underscore(name).toUpperCase() %>S_SUCCEEDED } from './list.actions';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import { put, takeEvery } from 'redux-saga/effects';

function* get<%= classify(name) %>s(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.<%= camelize(name) %>.get(action.data).toPromise();
    yield put({ type: FETCH_<%= underscore(name).toUpperCase() %>S_SUCCEEDED, data: results.items, pagination: results.pagination });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetch<%= classify(name) %>sRequest() {
  yield takeEvery(FETCH_<%= underscore(name).toUpperCase() %>S_REQUESTED, get<%= classify(name) %>s);
}

function* sort<%= classify(name) %>s(action) {
  const api = AppInjector.get(ApiService);
  try {
    let results = yield api.<%= camelize(name) %>.sort(action.data).toPromise();
    yield put({ type: SORT_<%= underscore(name).toUpperCase() %>S_SUCCEEDED, data: results.items, total: results.total });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSort<%= classify(name) %>sRequest() {
  yield takeEvery(SORT_<%= underscore(name).toUpperCase() %>S_REQUESTED, sort<%= classify(name) %>s);
}

export default [
  watchFetch<%= classify(name) %>sRequest,
  watchSort<%= classify(name) %>sRequest,
];
