import { fork, select, takeEvery, put } from 'redux-saga/effects';
import * as _ from 'lodash';
import listSaga from './list/list.saga';
import editSaga from './edit/edit.saga';
import createSaga from './create/create.saga';
import { ApiService } from '../../api/api.service';
import { API_CALL_ERROR } from '../../store/action';
import { GET_ALL_DESIGNERS_REQUESTED, GET_ALL_DESIGNERS_SUCCEEDED } from './designer.actions';
import { AppInjector } from '../../app-injector';

function* allSaga() {
  const api = AppInjector.get(ApiService);
  const designer = yield select((state) => (state as any).Designer.all.fetched);
  if (!designer) {
    try {
      let results = yield api.designer.list().toPromise();
      yield put({type: GET_ALL_DESIGNERS_SUCCEEDED, data: results});
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const designerData = yield select((state) => (state as any).Designer.all.items);
    yield put({type: GET_ALL_DESIGNERS_SUCCEEDED, data: designerData});
  }
}

function* watchFetchAllDesignersRequest() {
  yield takeEvery(GET_ALL_DESIGNERS_REQUESTED, allSaga);
}

export default _.map([
  ...listSaga,
  ...editSaga,
  ...createSaga,
  watchFetchAllDesignersRequest
], item => fork(item));
