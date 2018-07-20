import { fork, select, put, takeEvery } from "redux-saga/effects";
import * as _ from "lodash";
import listSaga from "./list/list.saga";
import editSaga from "./edit/edit.saga";
import createSaga from "./create/create.saga";
import { ApiService } from '../../api/api.service';
import { API_CALL_ERROR } from '../../store/action';
import { GET_ALL_PROVIDERS_REQUESTED, GET_ALL_PROVIDERS_SUCCEEDED } from './provider.actions';
import { AppInjector } from '../../app-injector';

function* allSaga() {
  const api = AppInjector.get(ApiService);
  const provider = yield select((state) => (state as any).Provider.all.fetched);
  if (!provider) {
    try {
      let results = yield api.provider.list().toPromise();
      yield put({type: GET_ALL_PROVIDERS_SUCCEEDED, data: results});
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const providerData = yield select((state) => (state as any).Provider.all.items);
    yield put({type: GET_ALL_PROVIDERS_SUCCEEDED, data: providerData});
  }
}

function* watchFetchAllProvidersRequest() {
  yield takeEvery(GET_ALL_PROVIDERS_REQUESTED, allSaga);
}
export default _.map([...listSaga, ...editSaga, ...createSaga, watchFetchAllProvidersRequest], item =>
  fork(item)
);
