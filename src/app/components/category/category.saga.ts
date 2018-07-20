import { fork, takeEvery, select, put } from "redux-saga/effects";
import * as _ from "lodash";
import listSaga from "./list/list.saga";
import editSaga from "./edit/edit.saga";
import createSaga from "./create/create.saga";
import { GET_ALL_CATEGORIES_REQUESTED, GET_ALL_CATEGORIES_SUCCEEDED } from './category.actions';
import { API_CALL_ERROR } from '../../store/action';
import { AppInjector } from '../../app-injector';
import { ApiService } from '../../api/api.service';

function* allSaga() {
  const api = AppInjector.get(ApiService);
  const category = yield select((state) => (state as any).Category.all.fetched);
  if (!category) {
    try {
      let results = yield api.category.allWithExtras().toPromise();
      yield put({type: GET_ALL_CATEGORIES_SUCCEEDED, data: results});
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    const categoryData = yield select((state) => (state as any).Category.all.items);
    yield put({type: GET_ALL_CATEGORIES_SUCCEEDED, data: categoryData});
  }
}

function* watchAllSagaRequest() {
  yield takeEvery(GET_ALL_CATEGORIES_REQUESTED, allSaga);
}

export default _.map([...listSaga, ...editSaga, ...createSaga, watchAllSagaRequest], item =>
  fork(item)
);
