import { fork, put, select, takeLatest, call } from 'redux-saga/effects';
import * as _ from "lodash";
import listSaga from "./list/list.saga";
import editSaga from "./edit/edit.saga";
import createSaga from "./create/create.saga";
import { API_CALL_ERROR } from '../../store/action';
import { GET_ALL_<%= underscore(name).toUpperCase() %>S_REQUESTED, GET_ALL_<%= underscore(name).toUpperCase() %>S_SUCCEEDED } from './<%= dasherize(name) %>.action';
import { ApiService } from '../../api/api.service';
import { AppInjector } from '../../app-injector';

export function* fetchAll<%= camelize(name) %>() {
  const fetchStatus = yield select((state) => (state as any).<%= camelize(name) %>.all.fetched);
  if (!fetchStatus) {
    try {
      let result = yield AppInjector.get(ApiService).<%= camelize(name) %>.list().toPromise();
      return result;
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const data = yield select(state => (state as any).<%= camelize(name) %>.all.items);
    return data;
  }
}


function* allSaga(action) {
  const data = yield call(fetchAll<%= camelize(name) %>);
  yield put({type: GET_ALL_<%= underscore(name).toUpperCase() %>S_SUCCEEDED, component: action.component, data: data});
}

function* watchFetchAll<%= classify(name) %>sRequest() {
  yield takeLatest(GET_ALL_<%= underscore(name).toUpperCase() %>S_REQUESTED, allSaga);
}
export default _.map([...listSaga, ...editSaga, ...createSaga, watchFetchAll<%= classify(name) %>sRequest], item =>
  fork(item)
);
