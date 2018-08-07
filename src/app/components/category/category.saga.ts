import { fork, put, select, takeLatest, call } from 'redux-saga/effects';
import * as _ from 'lodash';
import listSaga from './list/list.saga';
import editSaga from './edit/edit.saga';
import createSaga from './create/create.saga';
import { API_CALL_ERROR } from '../../store/action';
import { GET_ALL_CATEGORIES_REQUESTED, GET_ALL_CATEGORIES_SUCCEEDED } from './category.action';
import { ApiService } from '../../api/api.service';
import { AppInjector } from '../../app-injector';

export function* fetchAllCategory() {
  const fetchStatus = yield select(state => (state as any).Category.all.fetched);
  if (!fetchStatus) {
    try {
      let result = yield AppInjector.get(ApiService)
        .category.list()
        .toPromise();
      return result;
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const data = yield select(state => (state as any).Category.all.items);
    return data;
  }
}

function* allSaga(action) {
  const data = yield call(fetchAllCategory);
  yield put({ type: GET_ALL_CATEGORIES_SUCCEEDED, component: action.component, data: data });
}

function* watchFetchAllCategorysRequest() {
  yield takeLatest(GET_ALL_CATEGORIES_REQUESTED, allSaga);
}
export default _.map([...listSaga, ...editSaga, ...createSaga, watchFetchAllCategorysRequest], item => fork(item));
