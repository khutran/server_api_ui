import * as $ from "jquery";
import { takeEvery, put, fork } from 'redux-saga/effects';
import { PRINT_RUNNING, PRINT_REQUEST } from './print.actions';

function* print(data) {
  yield put({ type: PRINT_RUNNING, data: data.data, component: data.component });
}

function* watchPrint() {
  yield takeEvery(PRINT_REQUEST, print);
}

export default [
  fork(watchPrint)
];
