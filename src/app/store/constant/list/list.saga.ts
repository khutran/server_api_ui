import { AppInjector } from '../../../app-injector';
import { API_CALL_ERROR } from '../../action';
import { takeEvery, put } from 'redux-saga/effects';
import { FETCH_CONSTANTS_SUCCEEDED, FETCH_CONSTANTS_REQUESTED } from './list.actions';
import { ApiService } from '../../../api/api.service';

function* listConstant(action) {
  const api = AppInjector.get(ApiService);
  try {
      let results = yield api.constant.get().toPromise();
    yield put({ type: FETCH_CONSTANTS_SUCCEEDED, data: results.item });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchListConstantRequest() {
  yield takeEvery(FETCH_CONSTANTS_REQUESTED, listConstant);
}

export default [
  watchListConstantRequest
];
