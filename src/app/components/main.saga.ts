import { takeEvery, put, select, fork } from 'redux-saga/effects';
import * as _ from 'lodash';

export default _.map([], item => fork(item));
