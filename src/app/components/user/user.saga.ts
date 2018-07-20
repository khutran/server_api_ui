import * as _ from 'lodash';
import listUserSaga from './list/list.saga';
import createUser from './create/create.saga';
import editUser from './edit/edit.saga';
import { fork } from 'redux-saga/effects';

export default _.map([...listUserSaga, ...createUser, ...editUser], item => fork(item));
