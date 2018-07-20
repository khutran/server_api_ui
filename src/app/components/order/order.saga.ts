import { fork } from 'redux-saga/effects';
import * as _ from 'lodash';
import listSaga from './list/list.saga';
import editSaga from './edit/edit.saga';
import detailSaga from './detail/detail.saga';

export default _.map([
  ...listSaga,
  ...editSaga,
  ...detailSaga,
], item => fork(item));
