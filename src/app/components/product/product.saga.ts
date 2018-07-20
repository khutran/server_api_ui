import { fork } from 'redux-saga/effects';
import * as _ from 'lodash';
import listSaga from './list/list.saga';
import detailSaga from './detail/detail.saga';
import editSaga from './edit/edit.saga';
import createSaga from './create/create.saga';
export default _.map([...listSaga, ...detailSaga, ...editSaga, ...createSaga], item => fork(item));
