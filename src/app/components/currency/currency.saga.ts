import { fork, put, select, takeLatest } from 'redux-saga/effects';
import * as _ from "lodash";
import listSaga from "./list/list.saga";
import editSaga from "./edit/edit.saga";
import createSaga from "./create/create.saga";
import { GET_ALL_CURRENCYS_REQUESTED, GET_ALL_CURRENCYS_SUCCEEDED } from './currency.actions';
import { API_CALL_ERROR } from '../../store/action';
import { AppInjector } from '../../app-injector';
import { takeEvery } from 'redux-saga';
import { ApiService } from '../../api/api.service';

function* allSaga() {
  const api = AppInjector.get(ApiService);
  const processType = yield select((state) => (state as any).Currency.all.fetched);
  if (!processType) {
    try {
      let results = yield api.currency.list().toPromise();
      yield put({type: GET_ALL_CURRENCYS_SUCCEEDED, data: results});
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const processTypeData = yield select((state) => (state as any).Currency.all.items);
    yield put({type: GET_ALL_CURRENCYS_SUCCEEDED, data: processTypeData});
  }
}

function* watchFetchAllCurrencysRequest() {
  yield takeEvery(GET_ALL_CURRENCYS_REQUESTED, allSaga);
}
export default _.map([...listSaga, ...editSaga, ...createSaga, watchFetchAllCurrencysRequest], item =>
  fork(item)
);
